
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

let clearRecords = () => {
    queryElement('#highScores" div').data = "";
    var i = 1;
    scoreArray.sort((a, b) = b.score - a.score);
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

    queryElement('#answerOptionss p').data = questions[questionNumber].answerText;
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
        } else [
            startQuestions();
            Array.from(answers).forEach(answer => {
                answer.classList.remove('disablePointer');
            })
}, 1000);

}

let quizTimer = () => {
    if (timer >0)
    {
        timer=timer-1;
        queryElement('#score').data=score;
        onlyDisplaySection("#completeQuiz")
    }
}

}