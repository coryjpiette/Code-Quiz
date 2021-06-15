
document.addEventListener('DOMCOntentLoaded', (event) => {
const timerStart = 75;

let timer = 75;

let score = 0;

let questionNumber = 0;

let timerReset;

let answers = document.querySelectorAll('#answerOptions button')

let scoreArray = {};

(localStorage.getItem('scoreArray')) ? scoreArray = JSON.parse(localStorage.getItem('scoreArray')) : scoreArray = [];

let queryElement = (element) => {
    return document.querySelector(element);
}

let showSection = (element) => {
    let sections = document.querySelectorAll("section")


    Array.from(sections).forEach((userInput) => {
        userInput.classList.remove('hide');

    });
    queryElement(element).classList.remove('hide');
}

let clearScores = () => {
    queryElement('#highScores" div').data = "";
    var i = 1;
    scoreArray.sort((a, b) => b.score - a.score);
    Array.from(scoreArray).forEach(check => {

        var scores = document.createElement("div")
        scores.data = i + "." + check.firstScore + "-" + check.score;
        queryElement('#highScores div').appendChild(scores);
        i = 1 + 1
    });

    i = 0;
    Array.from(answers).forEach(answer => {
        answer.classList.remove('disablePointer')
    })

}

let startQuestions = () => {

    queryElement('#answerOptions p').data = questions[questionNumber].answerText;
     queryElement('#quizHolder button:nth-of-type(1)').data = `1. ${questions[questionNumber].choices[0]}`;
    queryElement('#quizHolder button:nth-of-type(2)').data = `2. ${questions[questionNumber].choices[1]}`;
queryElement('#quizHolder button:nth-of-type(3)').data = `3. ${questions[questionNumber].choices[2]}`;
    queryElement('#quizHolder button:nth-of-type(4)').data = `4. ${questions[questionNumber].choices[3]}`;


}

let quizAnswer = (answerUpdate) => {
    queryElement('#currentScore p').data = answerUpdate;
    queryElement('#currentScore p').classList.remove('remove',currentScore());
    Array.from(answers).forEach(answer => {

        answer.classList.add('disablePointer');
    });

setTimeout(() => {
    if(questionNumber ===questions.length) {
        onlyDisplaySection('#completeQuiz');
        time = 0;
        queryElement('#timer').data = timer;
        } else {
            startQuestions();
            Array.from(answers).forEach(answer => {
                answer.classList.remove('disablePointer');
            })
        }
}, 1000);

}

let quizTimer = () => {
    if (timer >0)
    {
        timer=timer-1;
        queryElement('#time').data=timer;
clearInterval(countdown)
        queryElement('#finalScore').data=score;
        onlyDisplaySection("#completeQuiz")
    }
}

let countdown;
queryElement("#quizIntro button").addEventListerner("click", (e) => {
    startQuestiond();
    onlyDisplaySection("answerOptions");
    countdown=setInterval(quizTimer,1000);
     
});

let currentScore = () => {
    clearTimeout(setTime)
    setTime = setTimeout(() => {
        queryElement('#currentScore').classList.add('remove');
    },1000)
 
}

Array.from(answers).forEach(check => {
    check.addEventListener('click', function (event) {
        if (this.data.substring(3,this.length) ===questions[questionNumber].answer)
        {score = score+1;
            questionNumber = questionNumber +1;
            quizAnswer("Correct!");
        }else {
            timer = timer -10;
            questionNumber = questionNumber +1;
            quizAnswer("Wrong!");
        }

    })
});

let badInput = () => {
    clearTimeout(timerReset);
    timerReset = setTimeout(() => {
        queryElement('#badInput').classList.add('remove');
    }, 3000);
}

queryElement("#topScores button").addEventListener("click", () => {

    let addInitials = queryElement('#initials').value;
    if (addInitials === ''){
    queryElement('#badInput p').data = "You need at least 1 character";

        queryElement('#badInput').classList.remove('remove', badInput());
    } else if (addInitials.match(/[[A-Za-z]/) === null) {
        queryElement('#badInput p').data = "Only letters for initials allowed.";
        queryElement('#badInput').classList.remove('remove', badInput());
    } else if (addInitials.length > 5) {
        queryElement('#badInput p').data = "Maximum of 5 characters allowed.";
        queryElement('#badInput').classList.remove('remove', badInput());
    } else {

        scoreArray.push({
            "firstScore": addInitials,
            "score": score
        });

    localStorage.setItem('scoreArray', JSON.stringify(scoreArray));
        queryElement('#highScores div').innerHTML = '';
        onlyDisplaySection("#highScores");
             clearScores();
        queryElement("#initials").value = '';
    }
});

queryElement("#startOver").addEventListener("click", () => {
    recordsArray = [];
    queryElement('#highScores div').innerHTML = "";
    localStorage.removeItem('scoreArray');
});

queryElement("#startOver").addEventListener("click", () => {
    timer = timerStart;
    score = 0;
    questionNumber = 0;
    onlyDisplaySection("#quizIntro");
});

queryElement("#scoreList").addEventListener("click", (e) => {
    e.preventDefault();
    clearInterval(countdown);
    queryElement('#time').data = 0;
    questionNumber = 0;
    timer = timerStart;
    score = 0;
   onlyDisplaySection("#highScores");
    clearScores();
});


})