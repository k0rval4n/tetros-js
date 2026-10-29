import TetrosBoardController from "~/Controllers/TetrosBoardController.js";
import TetrosGameOverChecker from "~/Controllers/TetrosGameOverChecker.js";
import BackgroundBlocksController from "~/Controllers/BackgroundBlocksController.js";
import TetrosSpeedCalculator from "~/Controllers/TetrosSpeedCalculator.js";
import TetrosScoreCalculator from "~/Controllers/TetrosScoreCalculator.js";
import TetrosEventListener from "~/EventListeners/TetrosEventListener.js";


export default class TetrosController {
  constructor() {
    this.boardController = new TetrosBoardController();
    this.eventListener = new TetrosEventListener(this.boardController);
    this.gameOverChecker = new TetrosGameOverChecker(this.boardController);
    this.backgroundBlocksController = new BackgroundBlocksController(
      this.boardController.backgroundBlocks
    );
    this.lastLoopTime = Date.now();
    this.score = 0;
    this.linesCompleted = 0;
    this.isRunning = true;
  }

  get level() {
    return Math.trunc(this.linesCompleted / 10);
  }

  gameLoop() {
    if (!this.isRunning) {
      return;
    }
    if (this.gameOverChecker.checkGameOver()) {
      this.stop();
      alert("Game Over");
      return;
    }
    const currentTime = Date.now();
    const deltaTime = currentTime - this.lastLoopTime;
    if (deltaTime < TetrosSpeedCalculator.getSpeed(this.level)) {
      requestAnimationFrame(this.gameLoop.bind(this));
      return;
    }
    this.lastLoopTime = currentTime;
    if (
      !this.boardController.canTetrominoMove(
        this.boardController.currentTetromino.x,
        this.boardController.currentTetromino.y + 1
      )
    ) {
      this.eventListener.removeEventListeners();
      this.prepareNextTetromino();
      this.eventListener.initEventListeners();

      requestAnimationFrame(this.gameLoop.bind(this));
    }
    this.eventListener.removeEventListeners();
    this.tryToMoveTetrominoDown();
    this.removeCompletedLinesAndAddScore();
    this.boardController.updateBackground();
    this.updateScore();
    this.updateLevel();
    this.eventListener.initEventListeners();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  prepareNextTetromino() {
    const currentTetromino = this.boardController.currentTetromino;
    this.backgroundBlocksController.addTetrominoToBackground(currentTetromino);
    this.boardController.clearTetromino();
    this.boardController.setRandomTetromino();
    this.boardController.drawTetromino();
    this.boardController.updateBackground();
  }

  tryToMoveTetrominoDown() {
    this.boardController.clearTetromino();
    this.boardController.tryToMoveTetromino(
      this.boardController.currentTetromino.x,
      this.boardController.currentTetromino.y + 1
    );
    this.boardController.drawTetromino();
  }

  removeCompletedLinesAndAddScore() {
    for (let i = 1; i <= 4; i++) {
      const count =
        this.backgroundBlocksController.getCountOfNLinesCompletedAndRemoveThem(
          i
        );
      if (count > 0) {
        this.linesCompleted += count * i;
        this.score +=
          count * TetrosScoreCalculator.getScoreOfLinesCompleted(this.level, i);
      }
    }
  }

  updateScore() {
    const scoreElement = document.getElementById("score-value");
    scoreElement.innerText = this.score;
  }

  updateLevel() {
    const levelElement = document.getElementById("level-value");
    levelElement.innerText = this.level;
  }

  start() {
    this.gameLoop();
    const startButton = document.getElementById("start-button");
    startButton.style.display = "none";
    const inGameControls = document.getElementById("in-game-controls");
    inGameControls.style.display = "flex";
  }

  pause() {
    this.isRunning = false;
    this.eventListener.removeEventListeners();
    const pauseButton = document.getElementById("pause-button");
    pauseButton.style.display = "none";
    const resumeButton = document.getElementById("resume-button");
    resumeButton.style.display = "block";
  }

  resume() {
    this.isRunning = true;
    this.eventListener.initEventListeners();
    const resumeButton = document.getElementById("resume-button");
    resumeButton.style.display = "none";
    const pauseButton = document.getElementById("pause-button");
    pauseButton.style.display = "block";
    this.gameLoop();
  }

  stop() {
    this.isRunning = false;
    this.boardController = null;
    this.eventListener.removeEventListeners();
    this.eventListener = null;
    this.gameOverChecker = null;
    this.backgroundBlocksController = null;
    const inGameControls = document.getElementById("in-game-controls");
    inGameControls.style.display = "none";
    const startButton = document.getElementById("start-button");
    startButton.style.display = "block";
  }
}
