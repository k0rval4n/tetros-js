import Tetromino from "~/DataStructures/Tetrominos/Tetromino.js";


export default class ZTetromino extends Tetromino {
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
