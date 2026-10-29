import Tetromino from "~/DataStructures/Tetrominos/Tetromino.js";


export default class TTetromino extends Tetromino {
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
