export default class TetrosSpeedCalculator {
  static getSpeed(level) {
    if (level === 0) {
      return 800;
    } else if (level === 1) {
      return 717;
    } else if (level === 2) {
      return 633;
    } else if (level === 3) {
      return 550;
    } else if (level === 4) {
      return 467;
    } else if (level === 5) {
      return 383;
    } else if (level === 6) {
      return 300;
    } else if (level === 7) {
      return 217;
    } else if (level === 8) {
      return 133;
    } else if (level === 9) {
      return 100;
    } else if (level <= 12) {
      return 83;
    } else if (level <= 15) {
      return 67;
    } else if (level <= 18) {
      return 50;
    } else if (level <= 28) {
      return 33;
    } else {
      return 17;
    }
  }
}
