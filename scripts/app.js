const gameOptions = {
  hearts: 5,
  randNumber: null,
  difficulty: null,
  timer: null,
  interval: null,
};

const difficultySection = document.querySelector(".difficulty-section");
const difficultySectionButton = document.querySelector(
  ".difficulty-section .chooseDifficulty"
);
const gameSection = document.querySelector(".game");
const gameSectionh1 = document.querySelector(".game h1");
const gamefeedback = document.querySelector(".game .feedback");
const guessInput = document.querySelector(".guess");
const iconResult = document.querySelector("#iconResult");
const textResult = document.querySelector("#textResult");
const resultSection = document.querySelector("#result");
const Hearts = document.querySelector(".hearts");
const Timer = document.querySelector(".timer");
const winIcons = ["😍", "😃", "😊", "🤩", "😎"];
const looseIcons = ["😥", "😪", "😔", "😭", "🥺"];

difficultySectionButton.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.localName == "button") {
    gameOptions.difficulty = e.target.id;
  }
  setRandNumber();
  updateGame();
  startGame();
  console.log(gameOptions);
});

function updateGame() {
  if (gameOptions.difficulty) {
    difficultySection.classList.add("hidden");
    gameSection.classList.remove("hidden");
  } else {
    gameSection.classList.add("hidden");
    difficultySection.classList.remove("hidden");
  }
  gamefeedback.innerHTML = "";
}

function setRandNumber() {
  switch (gameOptions.difficulty) {
    case "easy":
      gameOptions.randNumber = Math.floor(Math.random() * 20) + 1;
      break;
    case "normal":
      gameOptions.randNumber = Math.floor(Math.random() * 30) + 1;
      break;
    case "hard":
      gameOptions.randNumber = Math.floor(Math.random() * 50) + 1;
      break;
  }
}

function showDifficulty() {
  switch (gameOptions.difficulty) {
    case "easy":
      return (gameSectionh1.innerHTML = "select number betwen 1 to 20");
    case "normal":
      return (gameSectionh1.innerHTML = "select number betwen 1 to 30");
    case "hard":
      return (gameSectionh1.innerHTML = "select number betwen 1 to 50");
  }
}
function gameOver(isWinner) {
  clearInterval(gameOptions.interval);

  if (isWinner) {
    iconResult.innerHTML =
      winIcons[Math.floor(Math.random() * winIcons.length)];
    textResult.innerHTML = `Well done!! you guessed right. The number was ${gameOptions.randNumber}.`;
  } else {
    iconResult.innerHTML =
      looseIcons[Math.floor(Math.random() * looseIcons.length)];
    textResult.innerHTML = `Sorry!! you guessed wrong. The number was ${gameOptions.randNumber}.`;
  }

  resultSection.classList.remove("hidden");
  resultSection.classList.add("popup");

  setTimeout(() => {
    resultSection.classList.remove("popup");
  }, 2000);

  gameOptions.hearts = 5;
  gameOptions.randNumber = null;
  gameOptions.difficulty = null;
  updateGame();
}

guessInput.addEventListener("change", (e) => {
  let guess = e.target.value;
  if (guess == gameOptions.randNumber) {
    gameOver(true);
  } else if (guess < gameOptions.randNumber) {
    gamefeedback.innerHTML = "Is Bigger";
  } else if (guess > gameOptions.randNumber) {
    gamefeedback.innerHTML = "Is Lower";
  }

  if (--gameOptions.hearts === 0) {
    gameOver(false);
  }
  Hearts.innerHTML = "💖".repeat(gameOptions.hearts);
  e.target.value = "";
});

function startTimer() {
  Timer.style.color='white'
  switch (gameOptions.difficulty) {
    case "easy":
      gameOptions.timer = 20;
      break;
    case "normal":
      gameOptions.timer = 15;
      break;
    case "hard":
      gameOptions.timer = 10;
      break;
  }
  Timer.innerHTML = gameOptions.timer;

  gameOptions.interval = setInterval(() => {
    --gameOptions.timer;
    Timer.innerHTML = gameOptions.timer;
    if(gameOptions.timer<=3){
      Timer.style.color='red';
      Timer.style.fontSize = '50px'
    }
    if (gameOptions.timer === 0) {
      gameOver(false);
    }
  }, 1000);
}

function startGame() {
  showDifficulty();
  startTimer();
  guessInput.focus();
  Hearts.innerHTML = "💖".repeat(5);
}
