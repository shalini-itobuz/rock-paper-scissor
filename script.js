let playerScore = 0;
let computerScore = 0;
let timer = 8;

const playerChoices = document.querySelectorAll(".choice");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const messageDisplay = document.getElementById("message");
const timerDisplay = document.getElementById("timer");
const playAgainButton = document.getElementById("play-again");
const resetGameButton = document.getElementById("reset-game");
const rockClick = document.getElementById('rock');
const paperClick = document.getElementById('paper');
const scissorsClick = document.getElementById('scissors');

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
  messageDisplay.textContent = "Shoot!!!!";
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
      if (playerScore === 3) {
        messageDisplay.textContent = "Player wins the game!";
      } else {
        messageDisplay.textContent = "Computer wins the game!";
      }
      playAgainButton.style.display = "flex";
      playAgainButton.style.justifyContent = 'center'
      resetGameButton.style.display = 'none';
    } else {
      timer = 8;
    }
  }, 1000);
}

playerChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (playerScore === 3) return;
    const playerChoice = choice.id;
    playRound(playerChoice);
  });
});


resetGameButton.addEventListener("click", resetGame);


playAgainButton.addEventListener("click", resetGame);