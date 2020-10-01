var timeEl = document.querySelector("#timer");
var start = document.getElementById("start");
var quiz = document.getElementById("hide");
var secondsLeft = 60;
var myCountdown;

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
}

start.addEventListener("click", startCountdown);