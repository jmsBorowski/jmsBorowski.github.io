const buttonColors = ["green", "grey", "orange", "pink"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;
let userTurn = false; 

let commentsArr = [
    "\"to be calm is the highest achievement of the self\"", 
    "\"find comfort in the chaos\"", 
    "\"peace is always beautiful\"", 
    "\"start today with a smile\"", 
    "\"what are you thankful for today?\"", 
    "\"quiet the mind and the soul will speak\"", 
    "\"meditate. slow down. there is no rush.\"", 
    "\"create your own kind of happy\"", 
    "\"it's a good day to be happy\"", 
    "\"enjoy the little things\"", 
    "\"the best is yet to come\""
    ]; 

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
    } else {
        restartGame(); 
    }
  });

function restartGame() {
  document.querySelector("h1").textContent = "Restarting Game"; 
  
  gameStarted = false; 
  gamePattern = [];
  userClickedPattern = [];
  level = 0;

  const startButton = document.getElementById("start-btn");

  document.querySelector("p").textContent = "please wait";

  setTimeout(() => {
    gameStarted = true;
    document.querySelector("p").textContent = "game restarted - see how long you can copy the highlighted pattern";
    startButton.src = "images/restart.png"; 
    nextSequence();
  }, 2000);
}

function startGame() {
  gameStarted = true;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;

  let startButton = document.getElementById("start-btn");
  startButton.src = "images/restart.png"; 

  document.querySelector("p").textContent = "see how long you can copy the highlighted pattern";
  nextSequence();
  
}

function nextSequence() {
    userClickedPattern = [];
    userTurn = false; 
    level++;
    updateLevelTitle("Level " + level);
    
    if (level >= 2) {
        document.querySelector("p").textContent = commentsArr[Math.floor(Math.random() * commentsArr.length)];
    }

    // add color to game sequence 
    const randomNumber = Math.floor(Math.random() * 4); // random num 0-3 inclusive 
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Iterate over the gamePattern array with a delay between each flash
    for (let i = 0; i < gamePattern.length; i++) {
      if(gameStarted) {
        const currentColor = gamePattern[i];
        //playSound(currentColor);
        setTimeout(() => {
            flashButton(currentColor);
        }, i * 2000);  
      }  
    }

    setTimeout(() => {
        userTurn = true; 
    }, 1500); 
  }

document.querySelectorAll(".button").forEach(function (button) {
        button.addEventListener("click", function () {
            if (userTurn) {
                const userChosenColor = this.id;
                if(gameStarted) {
                    userClickedPattern.push(userChosenColor);
                    //playSound(userChosenColor);
                    flashButton(userChosenColor);
                    checkAnswer(userClickedPattern.length - 1);
                } 
            }
        });
}); 

function flashButton(color) {
    const button = document.getElementById(color);

    if (button) {
        console.log(`Button with ID '${color}' found.`);
        //button.style.backgroundColor = color;

        let originalImage = button.src; 

        if (color == "orange") {
            button.src = 'images/fish2.png'; 
            originalImage = 'images/fish1.png'; 
        } else if (color == "green") {
            button.src = 'images/grass2.png'; 
            originalImage = 'images/grass1.png'; 
        } else if (color == "grey") {
            button.src = 'images/rocks2.png'; 
            originalImage = 'images/rocks1.png'; 
        } else if (color == "pink") {
            button.src = 'images/petals2.png'; 
            originalImage = 'images/petals1.png'; 
        } 

        playSound(color);
        setTimeout(() => {
            //button.style.backgroundColor = '';
            button.src = originalImage; 
        }, 1500); 
    } else {
        console.error(`Element with ID '${color}' not found.`);
    } 
}   

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(() => {
        }, 1000); 
        setTimeout(() => {
        nextSequence();
      }, 2000);
    }
  } else {
    playSound("wrong");
    updateLevelTitle("Game Over");
    document.querySelector("p").textContent = "your score was " + level + 
                                              "\ngood job!" + 
                                              "\npress the play button to play again";
    gameStarted = false; 

    let startButtonEnd = document.getElementById("start-btn");
    startButtonEnd.src = "images/play.png"; 
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

/*let gamePaused = false;

document.getElementById("info-btn").addEventListener("click", function () {
  if (!gamePaused) {
    // Pause the game
    gamePaused = true;
    pauseGame();

    // Show overlay and panel
    document.getElementById("overlay").style.visibility = "visible";
    document.getElementById("popUp").style.visibility = "visible";
    document.getElementById("panel-content").style.visibility = "visible";
  }
});

document.getElementById("close-btn").addEventListener("click", function () {
  if (gamePaused) {
    // Resume the game
    gamePaused = false;
    resumeGame();

    // Hide overlay and panel
    document.getElementById("overlay").style.visibility = "hidden";
    document.getElementById("popUp").style.visibility = "hidden";
    document.getElementById("panel-content").style.visibility = "hidden";
  }
});

function pauseGame() {

}

function resumeGame() {

}*/