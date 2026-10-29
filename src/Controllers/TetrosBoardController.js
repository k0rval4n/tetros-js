import OTetromino from "~/DataStructures/Tetrominos/OTetromino.js";
import ITetromino from "~/DataStructures/Tetrominos/ITetromino.js";
import JTetromino from "~/DataStructures/Tetrominos/JTetromino.js";
import LTetromino from "~/DataStructures/Tetrominos/LTetromino.js";
import STetromino from "~/DataStructures/Tetrominos/STetromino.js";
import ZTetromino from "~/DataStructures/Tetrominos/ZTetromino.js";
import TTetromino from "~/DataStructures/Tetrominos/TTetromino.js";
import TetrosCanvasDrawer from "~/Controllers/TetrosCanvasDrawer.js";
import BackgroundBlocks from "~/DataStructures/BackgroundBlocks.js";


const TETROMINOS = [
  OTetromino,
  ITetromino,
  JTetromino,
  LTetromino,
  STetromino,
  ZTetromino,
  TTetromino,
];

const DELTA_X = [0, -1, 1, -2, 2];

export default class TetrosBoardController {
  constructor() {
    const gameCanvas = document.getElementById("game-canvas");
    this.tetrosInGameDrawer = new TetrosCanvasDrawer(gameCanvas);
    this.backgroundBlocks = new BackgroundBlocks();
    this.setRandomTetromino();
  }

  setRandomTetromino() {
    const randomIndex =
      Math.floor(Math.random() * TETROMINOS.length) % TETROMINOS.length;
    this.currentTetromino = new TETROMINOS[randomIndex]();
  }

  tryToMoveTetromino(x, y) {
    if (!this.canTetrominoMove(x, y)) {
      return;
    }

    this.clearTetromino();
    this.currentTetromino.x = x;
    this.currentTetromino.y = y;
    this.drawTetromino();
  }

  canTetrominoMove(x, y) {
    const shape = this.currentTetromino.shape;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const newX = x + j;
          const newY = y + i;
          if (!this.isTetrominoBlockInValidPosition(newX, newY)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  isTetrominoBlockInValidPosition(x, y) {
    return x >= 0 && x < 10 && y < 23 && !this.backgroundBlocks.getBlock(x, y);
  }

  tryToRotateToLeftTetromino() {
    const leftRotationShape = this.currentTetromino.leftRotationShape;
    const result = this.tryToRotateTetrimino(leftRotationShape);
    if (result.canBeRotated) {
      this.clearTetromino();
      this.currentTetromino.rotateToLeft();
      this.currentTetromino.x = result.newX;
      this.currentTetromino.y = result.newY;
      this.drawTetromino();
    }
  }

  tryToRotateTetrimino(newShape) {
    const x_tetromino = this.currentTetromino.x;
    const y_tetromino = this.currentTetromino.y;
    mainRotateLoop: for (const deltaX of DELTA_X) {
      for (let i = 0; i < newShape.length; i++) {
        for (let j = 0; j < newShape[i].length; j++) {
          if (newShape[i][j] === 1) {
            const newX = x_tetromino + j + deltaX;
            const newY = y_tetromino + i;
            if (!this.isTetrominoBlockInValidPosition(newX, newY)) {
              continue mainRotateLoop;
            }
          }
        }
      }
      return {
        canBeRotated: true,
        newX: x_tetromino + deltaX,
        newY: y_tetromino,
      };
    }
    return {
      canBeRotated: false,
      newX: x_tetromino,
      newY: y_tetromino,
    };
  }

  tryToRotateToRightTetromino() {
    const rightRotationShape = this.currentTetromino.rightRotationShape;
    const result = this.tryToRotateTetrimino(rightRotationShape);
    if (result.canBeRotated) {
      this.clearTetromino();
      this.currentTetromino.rotateToRight();
      this.currentTetromino.x = result.newX;
      this.currentTetromino.y = result.newY;
      this.drawTetromino();
    }
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
}
