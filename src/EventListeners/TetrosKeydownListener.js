export default class TetrosKeydownListener {
  constructor(boardController) {
    this.boardController = boardController;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      this.boardController.tryToMoveTetromino(
        this.boardController.currentTetromino.x - 1,
        this.boardController.currentTetromino.y
      );
    } else if (event.key === "ArrowRight") {
      this.boardController.tryToMoveTetromino(
        this.boardController.currentTetromino.x + 1,
        this.boardController.currentTetromino.y
      );
    } else if (event.key === "ArrowDown") {
      this.boardController.tryToMoveTetromino(
        this.boardController.currentTetromino.x,
        this.boardController.currentTetromino.y + 1
      );
    } else if (event.key === "q") {
      this.boardController.tryToRotateToLeftTetromino();
    } else if (event.key === "e") {
      this.boardController.tryToRotateToRightTetromino();
    }
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
}
