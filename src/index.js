// Programmed by @k0rval4n
// This is a simple Tetris game implemented using HTML, CSS and JavaScript.
// Uses Vite to bundle the project and make it modular and more maintainable.
import TetrosController from "~/Controllers/TetrosController.js";


let tetrosController;

const startGame = () => {
  tetrosController = new TetrosController();
  tetrosController.start();
};

const pauseGame = () => {
  if (tetrosController) {
    tetrosController.pause();
  }
};

const resumeGame = () => {
  if (tetrosController) {
    tetrosController.resume();
  }
};

const stopGame = () => {
  if (tetrosController) {
    tetrosController.stop();
  }
  tetrosController = null;
};

const startGameButton = document.getElementById("start-button");
const pauseGameButton = document.getElementById("pause-button");
const resumeGameButton = document.getElementById("resume-button");
const stopGameButton = document.getElementById("stop-button");
const infoLogo = document.getElementById("info-logo");
const infoDialog = document.getElementById("info-dialog");

startGameButton.addEventListener("click", () => startGame())
pauseGameButton.addEventListener("click", () => pauseGame())
resumeGameButton.addEventListener("click", () => resumeGame())
stopGameButton.addEventListener("click", () => stopGame())

infoLogo.addEventListener("click", () => {
  pauseGame();
  infoDialog.showModal();
});
