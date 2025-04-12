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
    this.context.fillRect(
      x * pixelSize,
      y * pixelSize,
      pixelSize,
      pixelSize
    );
  }

  getPixelSize() {
    return this.canvas.width / 10;
  }

  clearBlock(x, y) {
    this.context.clearRect(
      x * this.getPixelSize(),
      y * this.getPixelSize(),
      this.getPixelSize(),
      this.getPixelSize()
    );
  }
}

const backgroundCanvas = document.getElementById('background-canvas');
const inGameCanvas = document.getElementById('in-game-canvas');
const tetrisBackgroundDrawer = new TetrisCanvasDrawer(backgroundCanvas);
const tetrisInGameDrawer = new TetrisCanvasDrawer(inGameCanvas);
