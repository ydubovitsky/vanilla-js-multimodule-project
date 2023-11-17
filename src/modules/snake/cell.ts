import cellSrc from "./assets/cell.png";

export default class Cell {
  image: HTMLImageElement;
  dx: number;
  dy: number;
  #coll: number;
  #row: number;

  constructor(coll: number, row: number, size: number) {
    this.#coll = coll;
    this.#row = row;
    this.dx = coll * size + (640 / 2 - (size * 15 / 2));
    this.dy = row * size + (360 / 2 - (size * 15 / 2));

    this.onInit();
  }

  onInit() {
    this.image = new Image();
    this.image.src = cellSrc;
  }
}
