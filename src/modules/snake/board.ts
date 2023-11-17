import Cell from "./cell";

export default class Board {
  ctx: CanvasRenderingContext2D;
  #size: number;
  cells: Cell[] = [];

  constructor(size: number, ctx: CanvasRenderingContext2D) {
    this.#size = size;
    this.ctx = ctx;

    this.onInit();
    this.render();
  }

  onInit(): void {
    for (let row = 0; row < this.#size; row++) {
      for (let column = 0; column < this.#size; column++) {
        this.cells.push(new Cell(row, column, 15));
      }
    }
  }

  render(): void {
    this.cells.forEach((cell) => {
      cell.image.addEventListener("load", () => {
        window.requestAnimationFrame(() => {
          this.ctx.drawImage(cell.image, cell.dx, cell.dy);
        });
      });
    });
  }
}
