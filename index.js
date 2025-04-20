// Programmed by @k0rval4n
// This is a simple Tetris game implemented using HTML, CSS and JavaScript.

class TetrosCanvasDrawer {
  constructor(canvas) {
    if (!canvas) {
      throw new Error("Canvas element is required");
    }
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
  }

  drawBlock(x, y, color) {
    this.context.fillStyle = color;
    const pixelSize = this.getPixelSize();
    this.context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  }

  getPixelSize() {
    return this.canvas.width / 10;
  }

  clearBlock(x, y) {
    const pixelSize = this.getPixelSize();
    this.context.clearRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  }
}

class Tetromino {
  constructor(shapes, color) {
    this.shapes = shapes;
    this.actualShapeIndex = 0;
    this.color = color;
    this.x = 3;
    this.y = 0;
  }

  get shape() {
    return this.shapes[this.actualShapeIndex];
  }

  get leftRotationShape() {
    return this.shapes[
      (this.actualShapeIndex - 1 + this.shapes.length) % this.shapes.length
    ];
  }

  rotateToLeft() {
    this.actualShapeIndex =
      (this.actualShapeIndex - 1 + this.shapes.length) % this.shapes.length;
  }

  get rightRotationShape() {
    return this.shapes[(this.actualShapeIndex + 1) % this.shapes.length];
  }

  rotateToRight() {
    this.actualShapeIndex = (this.actualShapeIndex + 1) % this.shapes.length;
  }
}

class OTetromino extends Tetromino {
  constructor() {
    const shapes = [
      [
        [1, 1],
        [1, 1],
      ],
    ];
    super(shapes, "yellow");
    this.x = 4;
  }
}

class ITetromino extends Tetromino {
  constructor() {
    // prettier-ignore
    const shapes = [
      [
        [1, 1, 1, 1],
      ],
      [
        [1],
        [1],
        [1],
        [1],
      ],
    ];
    super(shapes, "cyan");
    this.y = 1;
  }
}

class JTetromino extends Tetromino {
  constructor() {
    const shapes = [
      [
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1],
        [0, 1],
        [1, 1],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
      ],
      [
        [1, 1],
        [1, 0],
        [1, 0],
      ],
    ];
    super(shapes, "blue");
  }
}

class LTetromino extends Tetromino {
  constructor() {
    const shapes = [
      [
        [0, 0, 1],
        [1, 1, 1],
      ],
      [
        [1, 0],
        [1, 0],
        [1, 1],
      ],
      [
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1],
        [0, 1],
        [0, 1],
      ],
    ];
    super(shapes, "orange");
  }
}

class STetromino extends Tetromino {
  constructor() {
    const shapes = [
      [
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0],
        [1, 1],
        [0, 1],
      ],
    ];
    super(shapes, "green");
  }
}

class ZTetromino extends Tetromino {
  constructor() {
    const shapes = [
      [
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1],
        [1, 1],
        [1, 0],
      ],
    ];
    super(shapes, "red");
  }
}

class TTetromino extends Tetromino {
  constructor() {
    const shapes = [
      [
        [0, 1, 0],
        [1, 1, 1],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 0],
      ],
      [
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [0, 1],
      ],
    ];
    super(shapes, "purple");
  }
}

const TETROMINOS = [
  OTetromino,
  ITetromino,
  JTetromino,
  LTetromino,
  STetromino,
  ZTetromino,
  TTetromino,
];

class BackgroundBlocks {
  constructor() {
    this.blocks = [];
    for (let y = 0; y < 23; y++) {
      this.blocks[y] = [];
      for (let x = 0; x < 10; x++) {
        this.blocks[y][x] = null;
      }
    }
  }

  getBlock(x, y) {
    return this.blocks[y][x];
  }

  addBlock(x, y, color) {
    this.blocks[y][x] = color;
  }
}

class TetrosBoardController {
  constructor() {
    const gameCanvas = document.getElementById("game-canvas");
    this.tetrosInGameDrawer = new TetrosCanvasDrawer(gameCanvas);
    this.backgroundBlocks = new BackgroundBlocks();
    this.setRandomTetromino();
  }

  setRandomTetromino() {
    const randomIndex =
      Math.floor(Math.random() * TETROMINOS.length) % TETROMINOS.length;
    this.lastY = null;
    this.currentTetromino = new TETROMINOS[randomIndex]();
  }

  hasTetrominoMovedDown() {
    const y_tetromino = this.currentTetromino.y;
    if (this.lastY !== y_tetromino) {
      this.lastY = y_tetromino;
      return true;
    }
    return false;
  }

  tryToMoveTetromino(x, y) {
    const shape = this.currentTetromino.shape;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const newX = x + j;
          const newY = y + i;
          if (newX < 0 || newX >= 10 || newY >= 23) {
            return;
          } else if (this.backgroundBlocks.getBlock(newX, newY)) {
            return;
          }
        }
      }
    }
    this.clearTetromino();
    this.currentTetromino.x = x;
    this.currentTetromino.y = y;
    this.drawTetromino();
  }

  tryToRotateToLeftTetromino() {
    const x_tetromino = this.currentTetromino.x;
    const y_tetromino = this.currentTetromino.y;
    const leftRotationShape = this.currentTetromino.leftRotationShape;
    for (let i = 0; i < leftRotationShape.length; i++) {
      for (let j = 0; j < leftRotationShape[i].length; j++) {
        if (leftRotationShape[i][j] === 1) {
          const newX = x_tetromino + j;
          const newY = y_tetromino + i;
          if (newX < 0 || newX >= 10 || newY >= 23) {
            return;
          } else if (this.backgroundBlocks.getBlock(newX, newY)) {
            return;
          }
        }
      }
    }
    this.clearTetromino();
    this.currentTetromino.rotateToLeft();
    this.drawTetromino();
  }

  tryToRotateToRightTetromino() {
    const x_tetromino = this.currentTetromino.x;
    const y_tetromino = this.currentTetromino.y;
    const rightRotationShape = this.currentTetromino.rightRotationShape;
    for (let i = 0; i < rightRotationShape.length; i++) {
      for (let j = 0; j < rightRotationShape[i].length; j++) {
        if (rightRotationShape[i][j] === 1) {
          const newX = x_tetromino + j;
          const newY = y_tetromino + i;
          if (newX < 0 || newX >= 10 || newY >= 23) {
            return;
          } else if (this.backgroundBlocks.getBlock(newX, newY)) {
            return;
          }
        }
      }
    }
    this.clearTetromino();
    this.currentTetromino.rotateToRight();
    this.drawTetromino();
  }

  addTetrominoToBackground() {
    const x_tetromino = this.currentTetromino.x;
    const y_tetromino = this.currentTetromino.y;
    const shape = this.currentTetromino.shape;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const newX = x_tetromino + j;
          const newY = y_tetromino + i;
          this.backgroundBlocks.addBlock(
            newX,
            newY,
            this.currentTetromino.color
          );
        }
      }
    }
    this.updateBackground();
  }

  drawTetromino() {
    const x_tetromino = this.currentTetromino.x;
    const y_tetromino = this.currentTetromino.y;
    const shape = this.currentTetromino.shape;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const x = x_tetromino + j;
          const y = y_tetromino + i;
          if (y > 2) {
            this.tetrosInGameDrawer.drawBlock(
              x,
              y - 3,
              this.currentTetromino.color
            );
          }
        }
      }
    }
  }

  clearTetromino() {
    const x_tetromino = this.currentTetromino.x;
    const y_tetromino = this.currentTetromino.y;
    const shape = this.currentTetromino.shape;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const x = x_tetromino + j;
          const y = y_tetromino + i;
          this.tetrosInGameDrawer.clearBlock(x, y - 3);
        }
      }
    }
  }

  updateBackground() {
    this.clearBackground();
    this.drawTetromino();
    for (let y = 0; y < 23; y++) {
      for (let x = 0; x < 10; x++) {
        const blockColor = this.backgroundBlocks.getBlock(x, y);
        if (blockColor) {
          this.tetrosInGameDrawer.drawBlock(x, y - 3, blockColor);
        }
      }
    }
  }

  clearBackground() {
    for (let y = 0; y < 23; y++) {
      for (let x = 0; x < 10; x++) {
        this.tetrosInGameDrawer.clearBlock(x, y - 3);
      }
    }
  }

  checkCompleteLines() {
    let hasChanged = false;
    for (let y = 0; y < 23; y++) {
      let complete = true;
      for (let x = 0; x < 10; x++) {
        if (!this.backgroundBlocks.getBlock(x, y)) {
          complete = false;
          break;
        }
      }
      if (complete) {
        this.removeCompleteLine(y);
        hasChanged = true;
      }
    }
    if (hasChanged) {
      this.updateBackground();
    }
  }

  removeCompleteLine(y) {
    for (let i = y; i > 0; i--) {
      this.backgroundBlocks.blocks[i] = this.backgroundBlocks.blocks[i - 1];
    }
  }
}

class TetrosEventListener {
  constructor(boardController) {
    this.boardController = boardController;
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener("keydown", (event) => {
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
    });
  }
}

class TetrosGameOverChecker {
  constructor(boardController) {
    this.boardController = boardController;
  }

  checkGameOver() {
    const backgroundBlocks = this.boardController.backgroundBlocks.blocks;
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 10; x++) {
        if (backgroundBlocks[x][y]) {
          return true;
        }
      }
    }
  }
}

class TetrosController {
  constructor() {
    this.boardController = new TetrosBoardController();
    this.eventListener = new TetrosEventListener(this.boardController);
    this.gameOverChecker = new TetrosGameOverChecker(this.boardController);
    this.lastLoopTime = Date.now();
    this.isFirstLoop = true;
  }

  gameLoop() {
    if (this.gameOverChecker.checkGameOver()) {
      alert("Game Over");
      return;
    }
    const currentTime = Date.now();
    const deltaTime = currentTime - this.lastLoopTime;
    if (deltaTime < 1000) {
      requestAnimationFrame(this.gameLoop.bind(this));
      return;
    }
    this.lastLoopTime = currentTime;
    if (!this.boardController.hasTetrominoMovedDown()) {
      this.boardController.addTetrominoToBackground();
      this.boardController.setRandomTetromino();
    }
    this.boardController.clearTetromino();
    this.boardController.tryToMoveTetromino(
      this.boardController.currentTetromino.x,
      this.boardController.currentTetromino.y + 1
    );
    this.boardController.drawTetromino();
    this.boardController.checkCompleteLines();

    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

const startGame = () => {
  const tetrosController = new TetrosController();
  tetrosController.gameLoop();
  const startButton = document.getElementById("start-button");
  startButton.style.display = "none";
  const inGameControls = document.getElementById("in-game-controls");
  inGameControls.style.display = "flex";
}

const pauseGame = () => {
  const pauseButton = document.getElementById("pause-button");
  pauseButton.style.display = "none";
  const resumeButton = document.getElementById("resume-button");
  resumeButton.style.display = "block";
}

const resumeGame = () => {
  const resumeButton = document.getElementById("resume-button");
  resumeButton.style.display = "none";
  const pauseButton = document.getElementById("pause-button");
  pauseButton.style.display = "block";
}

const stopGame = () => {}
