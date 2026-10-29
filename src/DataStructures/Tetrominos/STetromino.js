import Tetromino from "~/DataStructures/Tetrominos/Tetromino.js";


export default class STetromino extends Tetromino {
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
