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

function questionClick() {
    // check if user guessed incorrectly
    if (this.value !== questions[currentQuestionIndex].answer) {
        //deduct time
        time -= 15;

    if (time < 0) {
        time = 0;
    }

    //display new time
        timerEl.textContent = time;
        feedbackEl.textContent = "Wrong!";
        feedbackEl.getElementsByClassName.color = "red";
        feedbackEl.getElementsByClassName.fontSize = "400%"
    } else {
        feedbackEl.textContent = "Correct, Well Done!";
        feedbackEl.getElementsByClassName.color = "green";
        feedbackEl.getElementsByClassName.fontSize == "400%";
    }

    // Right or Wrong feedback
        feedbackEl.setAttribute("class", "feedback");
        setTimeout(function() {
            feedbackEl.setAttribute("class", "feedback hide");
        }, 1000);
}

        // Next Question
        currentQuestionIndex++;

    // Check Time
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }

function quizEnd() {
    clearInterval(timerId);

    // End Screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    // Final Score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.setAttribute("class", "hide");
}

function clockTick() {
    // Update Time
    time--;
    timerEl.textContent = time;

    // Check if out of time
    if (time <=0) {
        quizEnd();
    }
}

function saveHighScore() {
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        // Get Saved Scores from LocalStorage or set empty array
        var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
        // Format new score object for current user
        var newScore = {
            score: time,
            initials: initials
        };
        // Local Storage save
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        window.location.href = "score.html";
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighScore();
    }
}

// Submit Initials
submitBtn.onclick = saveHighScore;

// Start Quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;

