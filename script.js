//Global variables
var timeEl = document.querySelector("#timer");
var start = document.getElementById("start");
var quiz = document.getElementById("hide");
var questionDiv = document.getElementById("question-div");
var choicesEl = document.getElementById("choices");
var initialsEl = document.getElementById("initials");
var secondsLeft = 60;
var myCountdown;
var currentQuestionIndex = 0;
var answerStatus;

//Question array with each question, the choices and the answer inside of an array
var question = [
  {
    title: "What is the correct format of an array?",
    choices: ["var test = (1, 2, 3)", "var test = [1, 2, 3]", "var test = {1, 2, 3}", "var test = array(1, 2, 3)"],
    answer: "var test = [1, 2, 3]",
  },
  {
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["<js>", "<javascript>", "<script>", "<scripting>"],
    answer: "<script>",
  },
  {
    title: "How do you create a function in JavaScript?",
    choices: ["function = myFunction()", "function myFunction()", "function:myFunction()", "function = myFunction[]"],
    answer: "function myFunction()",
  }
];

// start countdown
function startCountdown() {
  myCountdown = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = "Timer: " + secondsLeft + " seconds left";

    if (secondsLeft === 0) {
      clearInterval(myCountdown);
    }
  }, 1000);
  
  //This removes the text on the first page, so the questions can display
  quiz.style.display = "none";
  questionDiv.style.display = "block";
  getQuestion();
}

//Function that makes the question appear
function getQuestion() {
  var currentQuestion = question[currentQuestionIndex];
  var titleEl = document.getElementById("title");
  titleEl.textContent = currentQuestion.title;
  
  //This resets the choices for each question
  choicesEl.innerHTML = "";
  currentQuestion.choices.forEach(function (choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = questionClick;
    choicesEl.appendChild(choiceBtn);
  });
}

//This function is what alerts if the question is correct or incorrect. If it is incorrect it will deduct time
function questionClick() {
  if (this.value !== question[currentQuestionIndex].answer) {

    //Deducts 5 seconds off timer if the answer is incorrect
    secondsLeft -= 5;

    // Alerts if the answer is incorrect
    answerStatus = document.getElementById("questionStatus");
    answerStatus.textContent = "Incorrect!";

    //This keeps the time from going to less than 0
    if (secondsLeft < 0) {
      secondsLeft = 0;
    }

    //Updates the time after the deduction
    timeEl.textContent = secondsLeft;
  } else {
    
    //Alerts if the answer is correct
    answerStatus = document.getElementById("questionStatus");
    answerStatus.textContent = "Correct!";
  }

  //Changes the index by 1, goes to next question
  currentQuestionIndex++;

  //If the index is at a number higher than the index of questions the quiz ends
  if (currentQuestionIndex === question.length) {
    quizEnd();

    //Else it will run through the get question function again
  } else {
    getQuestion();
  }
}

function quizEnd() {

  //Stops the timer after the quiz ends
  clearInterval(myCountdown);

  //Displays your score and the input to put your initials
  var endScreenEl = document.getElementById("end-screen");
  var finalScoreEl = document.getElementById("final-score");
  questionDiv.style.display = "none";
  endScreenEl.style.display = "block";
  finalScoreEl.textContent = secondsLeft;
}

//Saves high score in local storage (application tab in the dev tools)
function saveHighScore() {
  var initials = initialsEl.trim;
  if (initials !== "") {
    var highScores =
      JSON.parse(window.localStorage.getItem("highScores")) || [];
    var newScore = {
      score: secondsLeft,
      initials: initials,
    };
    highScores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
  }
}

start.addEventListener("click", startCountdown);
document.getElementById("save").onclick = saveHighScore;