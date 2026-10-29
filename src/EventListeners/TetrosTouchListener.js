export default class TetrosTouchListener {
  constructor(boardController) {
    this.boardController = boardController;
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.isMoving = false;
    this.mustCaptureTouch = false;
    this.isFirstMove = false;
    this.startX = null;
    this.startY = null;
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener("touchstart", this.handleTouchStart);
    document.addEventListener("touchmove", this.handleTouchMove);
    document.addEventListener("touchend", this.handleTouchEnd);
  }

  handleTouchStart(event) {
    if (
      event.target === document.getElementById("pause-button") ||
      event.target === document.getElementById("resume-button") ||
      event.target === document.getElementById("stop-button")
    ) {
      return;
    }
    this.isMoving = false;
    this.mustCaptureTouch = true;
    this.isFirstMove = true;
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  }

  handleTouchMove(event) {
    if (
      event.target === document.getElementById("pause-button") ||
      event.target === document.getElementById("resume-button") ||
      event.target === document.getElementById("stop-button")
    ) {
      return;
    }
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const deltaX = touchX - this.startX;
    const deltaY = touchY - this.startY;
    const norm = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    if (Math.abs(deltaX) < 14 && Math.abs(deltaY) < 14) {
      return;
    }

    if (!this.mustCaptureTouch) {
      return;
    }

    this.isMoving = true;

    const gameCanvasWidth = document.getElementById("game-canvas").offsetWidth;

    let timeout = 75;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        this.boardController.tryToMoveTetromino(
          this.boardController.currentTetromino.x + 1,
          this.boardController.currentTetromino.y
        );
      } else {
        this.boardController.tryToMoveTetromino(
          this.boardController.currentTetromino.x - 1,
          this.boardController.currentTetromino.y
        );
      }
    } else if (deltaY > 0) {
      this.boardController.tryToMoveTetromino(
        this.boardController.currentTetromino.x,
        this.boardController.currentTetromino.y + 1
      );
    }

    if (Math.abs(norm) > 18) {
      timeout = gameCanvasWidth / (1.5 * Math.log2(Math.abs(norm)));
    }

    this.startX = touchX;
    this.startY = touchY;
    this.mustCaptureTouch = false;
    this.isFirstMove = false;
    setTimeout(() => {
      this.mustCaptureTouch = true;
    }, timeout);
  }

  handleTouchEnd(event) {
    this.mustCaptureTouch = false;
    const deltaX = event.changedTouches[0].clientX - this.startX;
    const deltaY = event.changedTouches[0].clientY - this.startY;

    if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5 && !this.isMoving) {
      this.boardController.tryToRotateToLeftTetromino();
    }
  }

  removeEventListeners() {
    document.removeEventListener("touchstart", this.handleTouchStart);
    document.removeEventListener("touchmove", this.handleTouchMove);
    document.removeEventListener("touchend", this.handleTouchEnd);
  }
}
