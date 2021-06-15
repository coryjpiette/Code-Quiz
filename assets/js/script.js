

var timerStart = 75;

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
    Array.from(answers)forEach(answer => {
        answer.classList.remove('disable')
    })

}

let startQuestions = () => {

    queryElement('#answerOptionss p').data = questions[quesrtionNumber].answerText;

    queryElement('#answerOptions button: