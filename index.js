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
  }

  get shape() {
    return this.shapes[this.actualShapeIndex];
  }

  rotateToLeft() {
    this.actualShapeIndex =
      (this.actualShapeIndex - 1 + this.shapes.length) % this.shapes.length;
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
  }
}

class JTetrimino extends Tetrimino {
  constructor() {
    const shapes = [
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
      [
        [1, 1, 1],
        [0, 0, 1],
      ],
    ];
    super(shapes, "blue");
  }
}

class LTetrimino extends Tetrimino {
  constructor() {
    const shapes = [
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
      [
        [0, 0, 1],
        [1, 1, 1],
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
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [0, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 0],
      ],
    ];
    super(shapes, "purple");
  }
}

const backgroundCanvas = document.getElementById("background-canvas");
const inGameCanvas = document.getElementById("in-game-canvas");
const tetrisBackgroundDrawer = new TetrisCanvasDrawer(backgroundCanvas);
const tetrisInGameDrawer = new TetrisCanvasDrawer(inGameCanvas);
