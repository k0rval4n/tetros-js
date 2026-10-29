import TetrosKeydownListener from "~/EventListeners/TetrosKeydownListener.js";
import TetrosTouchListener from "~/EventListeners/TetrosTouchListener.js";

export default class TetrosEventListener {
  constructor(boardController) {
    this.boardController = boardController;
    this.tetrosKeydownListener = new TetrosKeydownListener(boardController);
    this.tetrosTouchListener = new TetrosTouchListener(boardController);
  }

  initEventListeners() {
    this.tetrosKeydownListener.initEventListeners();
    this.tetrosTouchListener.initEventListeners();
  }

  removeEventListeners() {
    this.tetrosKeydownListener.removeEventListeners();
    this.tetrosTouchListener.removeEventListeners();
  }
}
