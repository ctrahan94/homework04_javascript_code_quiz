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
}

start.addEventListener("click", startCountdown);