import canvasBackgroundSrc from "./assets/background-canvas.jpg";

export default class Canvas {
  context: CanvasRenderingContext2D;

  image: HTMLImageElement;
  dx: number;
  dy: number;

  constructor(dx: number, dy: number, context: CanvasRenderingContext2D) {
    this.dx = dx;
    this.dy = dy;
    this.context = context;

    this.render();
  }

  render() {
    this.image = new Image();
    this.image.src = canvasBackgroundSrc;

    this.image.addEventListener("load", () => {
      window.requestAnimationFrame(() => {
        this.context.drawImage(this.image, this.dx, this.dy);
      });
    });
  }
}
