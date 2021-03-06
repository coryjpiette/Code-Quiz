
document.addEventListener('DOMContentLoaded', (event) => {
    const timerStart = 75;
    
    let timer = 75;
    let score = 0;
    let questionNumber = 0;
    let setTimer;
    let answers = document.querySelectorAll('#answerOptions button')
    
    let scoreArray = {};
    
    (localStorage.getItem('scoreArray')) ? scoreArray = JSON.parse(localStorage.getItem('scoreArray')) : scoreArray = [];
    
    let queryElement = (element) => {
        return document.querySelector(element);
    }
    
    let showSection = (element) => {
        let sections = document.querySelectorAll("section")
    
    
        Array.from(sections).forEach((userItem) => {
            userItem.classList.add('hide');
    
        });
        queryElement(element).classList.remove('hide');
    }
    
    let clearScores = () => {
        queryElement('#highScores div').innerHTML = "";
        var i = 1;
        scoreArray.sort((a, b) => b.score - a.score);
        Array.from(scoreArray).forEach(check => {
    
            var scores = document.createElement("div")
            scores.innerHTML = i + ". " + check.firstScore + "  (score:" + check.score+")";
            queryElement('#highScores div').appendChild(scores);
            i = i + 1
        });
    
        i = 0;
        Array.from(answers).forEach(answer => {
            answer.classList.remove('disablePointer')
        })
    
    }
    
    let startQuestions = () => {
    
        queryElement('#answerOptions p').innerHTML = questions[questionNumber].answerText;
        queryElement('#answerOptions button:nth-of-type(1)').innerHTML = `1. ${questions[questionNumber].choices[0]}`;
        queryElement('#answerOptions button:nth-of-type(2)').innerHTML = `2. ${questions[questionNumber].choices[1]}`;
        queryElement('#answerOptions button:nth-of-type(3)').innerHTML = `3. ${questions[questionNumber].choices[2]}`;
        queryElement('#answerOptions button:nth-of-type(4)').innerHTML = `4. ${questions[questionNumber].choices[3]}`;
    
    }
    
    let quizAnswer = (answerUpdate) => {
        queryElement('#currentScore p').innerHTML = answerUpdate;
        queryElement('#currentScore').classList.remove('remove',currentScore());
        Array.from(answers).forEach(answer => 
            {
    
            answer.classList.add('disablePointer');
        });
    
    setTimeout(() => {
        if(questionNumber === questions.length) {
            showSection('#completeQuiz');
            timer = 0;
            queryElement('#time').innerHTML = timer;
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
            queryElement('#time').innerHTML=timer;
        }else {
    clearInterval(countdown)
            queryElement('#finalScore').innerHTML=score;
            showSection("#completeQuiz")
        }
    }
    
    //Starting quiz and countdown
    
    let countdown;
    queryElement("#quizIntro button").addEventListener("click", (e) => {
        startQuestions();
        showSection("#answerOptions");
        countdown=setInterval(quizTimer, 1000);
         
    });
    
    let currentScore = () => {
        clearTimeout(setTimer)
        setTimer = setTimeout(() => {
            queryElement('#currentScore').classList.add('remove');
        },1000)
     
    }
    
    
    Array.from(answers).forEach(check => {
        check.addEventListener('click', function (event) {
            if (this.innerHTML.substring(3,this.length) === questions[questionNumber].answer)
            {score = score + 1;
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
        clearTimeout(setTimer);
        setTimer = setTimeout(() => {
            queryElement('#badInput').classList.add('remove');
        }, 3000);
    }
    
    queryElement("#topScores button").addEventListener("click", () => {
    
        let addInitials = queryElement('#initials').value;
        if (addInitials === ''){
        queryElement('#badInput p').innerHTML = "You need at least 1 character";
    
            queryElement('#badInput').classList.remove('remove', badInput());
        } else if (addInitials.match("^[A-Za-z]") === null) {
            queryElement('#badInput p').innerHTML = "Only letters for initials allowed.";
            queryElement('#badInput').classList.remove('remove', badInput());
        } else if (addInitials.length > 5) {
            queryElement('#badInput p').innerHTML = "Maximum of 5 characters allowed.";
            queryElement('#badInput').classList.remove('remove', badInput());
        } else {
    
            scoreArray.push({
                "firstScore": addInitials,
                "score": score
            });
    
        localStorage.setItem('scoreArray', JSON.stringify(scoreArray));
            queryElement('#highScores div').innerHTML = '';
            showSection("#highScores");
                 clearScores();
            queryElement("#initials").value = '';
        }
    });
    
    queryElement("#removeScores").addEventListener("click", () => {
        scoreArray = [];
        queryElement('#highScores div').innerHTML = "";
        localStorage.removeItem('scoreArray');
    });
    
    queryElement("#startOver").addEventListener("click", () => {
        timer = timerStart;
        score = 0;
        questionNumber = 0;
        showSection("#quizIntro");
    });
    
    queryElement("#scoreList").addEventListener("click", (e) => {
        e.preventDefault();
        clearInterval(countdown);
        queryElement('#time').innerHTML = 0;
        questionNumber = 0;
        timer = timerStart;
        score = 0;
       showSection("#highScores");
        clearScores();
    });
    
    });
  
    