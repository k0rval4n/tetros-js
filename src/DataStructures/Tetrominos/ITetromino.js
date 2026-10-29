import Tetromino from "~/DataStructures/Tetrominos/Tetromino.js";


export default class ITetromino extends Tetromino {
  constructor() {
    // prettier-ignore
    const shapes = [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ];
    super(shapes, "cyan");
  }
}
