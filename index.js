// Programmed by @k0rval4n
// This is a simple Tetris game implemented using HTML, CSS and JavaScript.

class TetrisCanvasDrawer {
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

class Tetrimino {
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

class OTetrimino extends Tetrimino {
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

class ITetrimino extends Tetrimino {
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

class JTetrimino extends Tetrimino {
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

class LTetrimino extends Tetrimino {
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

class STetrimino extends Tetrimino {
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

class ZTetrimino extends Tetrimino {
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

class TTetrimino extends Tetrimino {
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

const TETRIMINOS = [
  OTetrimino,
  ITetrimino,
  JTetrimino,
  LTetrimino,
  STetrimino,
  ZTetrimino,
  TTetrimino,
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

class TetrisBoardController {
  constructor() {
    const gameCanvas = document.getElementById("game-canvas");
    this.tetrisInGameDrawer = new TetrisCanvasDrawer(gameCanvas);
    this.backgroundBlocks = new BackgroundBlocks();
    this.setRandomTetrimino();
  }

  setRandomTetrimino() {
    const randomIndex =
      Math.floor(Math.random() * TETRIMINOS.length) % TETRIMINOS.length;
    this.lastY = null;
    this.currentTetrimino = new TETRIMINOS[randomIndex]();
  }

  hasTetriminoMovedDown() {
    const y_tetrimino = this.currentTetrimino.y;
    if (this.lastY !== y_tetrimino) {
      this.lastY = y_tetrimino;
      return true;
    }
    return false;
  }

  tryToMoveTetrimino(x, y) {
    const shape = this.currentTetrimino.shape;
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
    this.clearTetrimino();
    this.currentTetrimino.x = x;
    this.currentTetrimino.y = y;
    this.drawTetrimino();
  }

  tryToRotateToLeftTetrimino() {
    const x_tetrimino = this.currentTetrimino.x;
    const y_tetrimino = this.currentTetrimino.y;
    const leftRotationShape = this.currentTetrimino.leftRotationShape;
    for (let i = 0; i < leftRotationShape.length; i++) {
      for (let j = 0; j < leftRotationShape[i].length; j++) {
        if (leftRotationShape[i][j] === 1) {
          const newX = x_tetrimino + j;
          const newY = y_tetrimino + i;
          if (newX < 0 || newX >= 10 || newY >= 23) {
            return;
          } else if (this.backgroundBlocks.getBlock(newX, newY)) {
            return;
          }
        }
      }
    }
    this.clearTetrimino();
    this.currentTetrimino.rotateToLeft();
    this.drawTetrimino();
  }

  tryToRotateToRightTetrimino() {
    const x_tetrimino = this.currentTetrimino.x;
    const y_tetrimino = this.currentTetrimino.y;
    const rightRotationShape = this.currentTetrimino.rightRotationShape;
    for (let i = 0; i < rightRotationShape.length; i++) {
      for (let j = 0; j < rightRotationShape[i].length; j++) {
        if (rightRotationShape[i][j] === 1) {
          const newX = x_tetrimino + j;
          const newY = y_tetrimino + i;
          if (newX < 0 || newX >= 10 || newY >= 23) {
            return;
          } else if (this.backgroundBlocks.getBlock(newX, newY)) {
            return;
          }
        }
      }
    }
    this.clearTetrimino();
    this.currentTetrimino.rotateToRight();
    this.drawTetrimino();
  }

  addTetriminoToBackground() {
    const x_tetrimino = this.currentTetrimino.x;
    const y_tetrimino = this.currentTetrimino.y;
    const shape = this.currentTetrimino.shape;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const newX = x_tetrimino + j;
          const newY = y_tetrimino + i;
          this.backgroundBlocks.addBlock(
            newX,
            newY,
            this.currentTetrimino.color
          );
        }
      }
    }
    this.updateBackground();
  }

  drawTetrimino() {
    const x_tetrimino = this.currentTetrimino.x;
    const y_tetrimino = this.currentTetrimino.y;
    const shape = this.currentTetrimino.shape;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const x = x_tetrimino + j;
          const y = y_tetrimino + i;
          if (y > 2) {
            this.tetrisInGameDrawer.drawBlock(
              x,
              y - 3,
              this.currentTetrimino.color
            );
          }
        }
      }
    }
  }

  clearTetrimino() {
    const x_tetrimino = this.currentTetrimino.x;
    const y_tetrimino = this.currentTetrimino.y;
    const shape = this.currentTetrimino.shape;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const x = x_tetrimino + j;
          const y = y_tetrimino + i;
          this.tetrisInGameDrawer.clearBlock(x, y - 3);
        }
      }
    }
  }

  updateBackground() {
    this.clearBackground();
    this.drawTetrimino();
    for (let y = 0; y < 23; y++) {
      for (let x = 0; x < 10; x++) {
        const blockColor = this.backgroundBlocks.getBlock(x, y);
        if (blockColor) {
          this.tetrisInGameDrawer.drawBlock(x, y - 3, blockColor);
        }
      }
    }
  }

  clearBackground() {
    for (let y = 0; y < 23; y++) {
      for (let x = 0; x < 10; x++) {
        this.tetrisInGameDrawer.clearBlock(x, y - 3);
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

class TetrisEventListener {
  constructor(boardController) {
    this.boardController = boardController;
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.boardController.tryToMoveTetrimino(
          this.boardController.currentTetrimino.x - 1,
          this.boardController.currentTetrimino.y
        );
      } else if (event.key === "ArrowRight") {
        this.boardController.tryToMoveTetrimino(
          this.boardController.currentTetrimino.x + 1,
          this.boardController.currentTetrimino.y
        );
      } else if (event.key === "ArrowDown") {
        this.boardController.tryToMoveTetrimino(
          this.boardController.currentTetrimino.x,
          this.boardController.currentTetrimino.y + 1
        );
      } else if (event.key === "q") {
        this.boardController.tryToRotateToLeftTetrimino();
      } else if (event.key === "e") {
        this.boardController.tryToRotateToRightTetrimino();
      }
    });
  }
}

class TetrisGameOverChecker {
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

class TetrisController {
  constructor() {
    this.boardController = new TetrisBoardController();
    this.eventListener = new TetrisEventListener(this.boardController);
    this.gameOverChecker = new TetrisGameOverChecker(this.boardController);
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
    if (!this.boardController.hasTetriminoMovedDown()) {
      this.boardController.addTetriminoToBackground();
      this.boardController.setRandomTetrimino();
    }
    this.boardController.clearTetrimino();
    this.boardController.tryToMoveTetrimino(
      this.boardController.currentTetrimino.x,
      this.boardController.currentTetrimino.y + 1
    );
    this.boardController.drawTetrimino();
    this.boardController.checkCompleteLines();

    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

const startGame = () => {
  const tetrisController = new TetrisController();
  tetrisController.gameLoop();
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
