export default class BackgroundBlocks {
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
