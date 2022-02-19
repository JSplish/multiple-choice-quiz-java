// DOM elements
var questionEL = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// Quiz state variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
    // hide start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl = setAttribute("class", "hide");

    // un-hide questions section
    questionsEl.removeAttribute("class");

    // start timer
    timerId = setInterval(clockTick, 1000);

    // show starting time
    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];

    // update title with current question
    var titleEL = document.getElementById("question-title");
    titleEL.textContent = currentQuestion.title;

    // clear out any old question choices
    choicesEl.innerHTML = "";

    // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {

        // create new button for each choice
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", "choice");
        
        choiceNode.textContent = i + 1+ ". " + choice;

        // attach click event listener to each choice
        choice.Node.onclick = questionClick;

        // display on the page
        choicesEl.appendChild(choiceNode);
});
}

