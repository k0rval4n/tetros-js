import Tetromino from "~/DataStructures/Tetrominos/Tetromino.js";


export default class OTetromino extends Tetromino {
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
