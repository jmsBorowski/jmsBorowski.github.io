const buttonColors = ["green", "grey", "orange", "pink"];
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

  for (let i = 0; i < level; i++) {
    const randomNumber = Math.floor(Math.random() * 4); // random number 0-4 inclusive 
    const randomChosenColor = buttonColors[randomNumber]; // random color from buttonColors 
    gamePattern.push(randomChosenColor);

    flashButton(randomChosenColor); 
  }
}

document.querySelectorAll(".button").forEach(function (button) {
        button.addEventListener("click", function () {
            const userChosenColor = this.id;
            if(gameStarted) {
                userClickedPattern.push(userChosenColor);
                playSound(userChosenColor);
                animatePress(userChosenColor);
                checkAnswer(userClickedPattern.length - 1);
            }
        });
});

function flashButton(color) {
    const button = document.getElementById(color); // Use getElementById for IDs
    button.style.backgroundColor = color;
    playSound(color);
    setTimeout(() => {
        button.style.backgroundColor = '';
    }, 300);
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
    updateLevelTitle("Game Over, Press Start to Restart");
    gameStarted = false; 
  }
}

function updateLevelTitle(title) {
  document.querySelector("h1").textContent = title;
}

function playSound(soundFileName) {
    const audio = new Audio("sounds/" + soundFileName + ".mp3");
    audio.play();
  }
