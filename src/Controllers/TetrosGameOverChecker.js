export default class TetrosGameOverChecker {
  constructor(boardController) {
    this.boardController = boardController;
  }

  checkGameOver() {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 10; x++) {
        if (this.boardController.backgroundBlocks.getBlock(x, y)) {
          return true;
        }
      }
    }

    return false;
  }
}
