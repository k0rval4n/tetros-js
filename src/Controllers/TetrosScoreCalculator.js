export default class TetrosScoreCalculator {
  static scoresByLevel = {
    1: [40, 80, 120, 400],
    2: [100, 200, 300, 1000],
    3: [300, 600, 900, 3000],
    4: [1200, 2400, 3600, 12000],
  };

  static getScoreOfLinesCompleted(level, numberOfAdjacentLines) {
    if (level === 0) {
      return this.scoresByLevel[numberOfAdjacentLines][0];
    } else if (level === 1) {
      return this.scoresByLevel[numberOfAdjacentLines][1];
    } else if (level === 2) {
      return this.scoresByLevel[numberOfAdjacentLines][2];
    } else if (level <= 9) {
      return this.scoresByLevel[numberOfAdjacentLines][3];
    } else {
      return this.scoresByLevel[numberOfAdjacentLines][0] * (level + 1);
    }
  }
}
