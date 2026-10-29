export default class BackgroundBlocksController {
  constructor(backgroundBlocks) {
    this.backgroundBlocks = backgroundBlocks;
  }

  addTetrominoToBackground(currentTetromino) {
    const x_tetromino = currentTetromino.x;
    const y_tetromino = currentTetromino.y;
    const shape = currentTetromino.shape;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const newX = x_tetromino + j;
          const newY = y_tetromino + i;
          this.backgroundBlocks.addBlock(newX, newY, currentTetromino.color);
        }
      }
    }
  }

  getCountOfNLinesCompletedAndRemoveThem(N) {
    let count = 0;
    let isComplete = false;
    for (let y = 0; y < 23; y++) {
      for (let i = y; i < y + N; i++) {
        isComplete = this.isLineComplete(i);
        if (!isComplete) {
          break;
        }
      }
      if (isComplete) {
        for (let i = y; i < y + N; i++) {
          this.removeLine(y);
        }
        count++;
      }
    }
    return count;
  }

  isLineComplete(y) {
    let isComplete = true;
    for (let x = 0; x < 10; x++) {
      if (!this.backgroundBlocks.getBlock(x, y)) {
        isComplete = false;
        break;
      }
    }

    return isComplete;
  }

  removeLine(y) {
    for (let i = y; i > 0; i--) {
      this.backgroundBlocks.blocks[i] = this.backgroundBlocks.blocks[i - 1];
    }
    this.backgroundBlocks.blocks[0] = [];
  }
}
