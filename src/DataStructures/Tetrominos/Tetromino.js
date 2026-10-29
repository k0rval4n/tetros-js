export default class Tetromino {
  constructor(shapes, color) {
    this.shapes = shapes;
    this.actualShapeIndex = 0;
    this.color = color;
    this.x = 3;
    this.y = 0;
  }

  get shape() {
    return this.shapes[this.actualShapeIndex];
  }

  get leftRotationShape() {
    return this.shapes[
      (this.actualShapeIndex - 1 + this.shapes.length) % this.shapes.length
    ];
  }

  rotateToLeft() {
    this.actualShapeIndex =
      (this.actualShapeIndex - 1 + this.shapes.length) % this.shapes.length;
  }

  get rightRotationShape() {
    return this.shapes[(this.actualShapeIndex + 1) % this.shapes.length];
  }

  rotateToRight() {
    this.actualShapeIndex = (this.actualShapeIndex + 1) % this.shapes.length;
  }
}
