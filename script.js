let playerScore = 0;
let computerScore = 0;
let timer = 8;

const playerChoices = document.querySelectorAll(".choice");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const messageDisplay = document.getElementById("message");
const timerDisplay = document.getElementById("timer");
const playAgainButton = document.getElementById("play-again");

function computerPlay() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function updateScore(winner) {
  if (winner === "Player wins!") {
    playerScore++;
  } else if (winner === "Computer wins!") {
    computerScore++;
  }
  playerScoreDisplay.textContent = `Player: ${playerScore}`;
  computerScoreDisplay.textContent = `Computer: ${computerScore}`;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = `Player: ${playerScore}`;
  computerScoreDisplay.textContent = `Computer: ${computerScore}`;
  messageDisplay.textContent = "Choose your weapon";
  playAgainButton.style.display = "none";
}

function playRound(playerChoice) {
  const computerChoice = computerPlay();
  messageDisplay.textContent = `Player chose ${playerChoice}`;
  setTimeout(() => {
    messageDisplay.textContent = `Computer chose ${computerChoice}`;
    let winner;
    if (playerChoice === computerChoice) {
      winner = "It's a tie!";
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      winner = "Player wins!";
    } else {
      winner = "Computer wins!";
    }
    setTimeout(() => {
      messageDisplay.textContent = winner;
    }, 1000);
    updateScore(winner);
    if (playerScore === 3 || computerScore === 3) {
      if (playerScore === 5) {
        messageDisplay.textContent = "Player wins the game!";
      } else {
        messageDisplay.textContent = "Computer wins the game!";
      }
      playAgainButton.style.display = "flex";
      playAgainButton.style.justifyContent='center'
    } else {
      timer = 8;
    }
  }, 1000);
}

playerChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const playerChoice = choice.id;
    playRound(playerChoice);
  });
});

function countdown() {
  timerDisplay.textContent = `Time left: ${timer}`;
  if (timer === 0) {
    playRound(computerPlay());
    timer = 8;
  } else {
    timer--;
    setTimeout(countdown, 1000);
  }
}

countdown();

playAgainButton.addEventListener("click", resetGame);
