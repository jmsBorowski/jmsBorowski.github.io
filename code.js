const buttonColors = ["green", "grey", "orange", "pink"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;
let userTurn = false; 

let audioOn = false; 
const audio = document.querySelector("audio");
const backgroundMusic = new Audio("sounds/backgroundMusic.mp3"); 
backgroundMusic.loop = true; 

document.getElementById("audio-btn").addEventListener("click", function () {
    const audioButton = document.getElementById("audio-btn");
    
    if (audioOn == false) { // if audio is Off, turn audio on 
        backgroundMusic.volume = 1; 
        backgroundMusic.play(); 
        audioOn = true; 
            
        audioButton.src = 'images/audioOn.png'; 
        
      } else { // if audio is On, turn audio off 
        audio.volume = 0; 
        backgroundMusic.volume = 0; 
        audioOn = false; 

        audioButton.src = 'images/audioOff.png'; 
      }
});

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
    userTurn = false; 
    level++;
    updateLevelTitle("Level " + level);
    
    // add color to game sequence 
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Iterate over the gamePattern array with a delay between each flash
    for (let i = 0; i < gamePattern.length; i++) {
      const currentColor = gamePattern[i];
      //playSound(currentColor);
      flashButton(currentColor);
    }
    userTurn = true; 
  }

document.querySelectorAll(".button").forEach(function (button) {
        button.addEventListener("click", function () {
            const userChosenColor = this.id;
            if(gameStarted && userTurn) {
                userClickedPattern.push(userChosenColor);
                //playSound(userChosenColor);
                flashButton(userChosenColor);
                checkAnswer(userClickedPattern.length - 1);
            }
        });
}); 

function flashButton(color) {
    const button = document.getElementById(color);

    if (button) {
        console.log(`Button with ID '${color}' found.`);
        //button.style.backgroundColor = color;

        const originalImage = button.src; 

        if (color == "orange") {
            button.src = 'images/fish2.png'; 
        } else if (color == "green") {
            button.src = 'images/grass2.png'; 
        } else if (color == "grey") {
            button.src = 'images/rocks2.png'; 
        } else if (color == "pink") {
            button.src = 'images/petals2.png'; 
        } 

        playSound(color);
        setTimeout(() => {
            //button.style.backgroundColor = '';
            button.src = originalImage; 
        }, 1000);
    } else {
        console.error(`Element with ID '${color}' not found.`);
    } 
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
    const audioSound = new Audio("sounds/" + soundFileName + ".mp3");
    audioSound.volume = audioOn ? 1 : 0; 
    audioSound.play();
}
