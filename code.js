const buttonColors = ["#green", "#red", "#yellow", "#blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

document.getElementById("start-btn").addEventListener("click", function () {
  if (!gameStarted) {
    startGame();
  }
});

function startGame() {
  gameStarted = true;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  nextSequence();
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  updateLevelTitle("Level " + level);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  flashButton(randomChosenColor);
}

document.querySelectorAll(".button").forEach(function (button) {
  button.addEventListener("click", function () {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function flashButton(color) {
  const button = document.querySelector(color);
  button.classList.add("flash");
  playSound(color);
  setTimeout(() => {
    button.classList.remove("flash");
  }, 300);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  const button = document.getElementById(currentColor);
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);
    updateLevelTitle("Game Over, Press Start to Restart");
    startGame();
  }
}

function updateLevelTitle(title) {
  document.querySelector("h1").textContent = title;
}
