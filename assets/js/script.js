

var timerStart = 75;

let timer =75;

let score = 0;

let scoreCount = 0;

let timerReset;

let answers = document.querySelectorAll('#answerOptions button')

let scoreArray = {};

(localStorage.getItem('scoreArray')) ? scoreArray = JSON.parse(localStorage.getItem('scoreArray')):scoreArray=[];

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

