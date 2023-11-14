import "./index.scss";
import canvasBackgroundSrc from "./assets/background-canvas.png";

type DataElementType = {
  [name: string]: HTMLElement;
};

export default class Snake {
  element: Element;
  #dataElements: DataElementType;
  #context: CanvasRenderingContext2D;

  constructor() {
    this.render();
    this.onInit();
    this.startGame();
  }

  onInit() : void {
    // set dataElements
    this.#dataElements = this.getDataElements(this.element);

    // Set context field
    const canvas = this.#dataElements.canvas as HTMLCanvasElement;
    this.#context = canvas.getContext("2d");
  }

  startGame() : void {
    const image : HTMLImageElement = document.createElement("img");
    image.src = canvasBackgroundSrc;

    image.addEventListener("load", () => {
      window.requestAnimationFrame(() => {
        this.#context.drawImage(image, 0, 0);
      });
    })
  }

  getTemplate() {
    const html = `
      <div class="snake-game">
        <canvas id="canvas" data-element="canvas" width="640" height="360"></canvas>
      </div>
    `;
    return html;
  }

  getDataElements(rootElement: Element): DataElementType {
    let result: DataElementType = {};
    const elements: NodeListOf<HTMLElement> =
      rootElement.querySelectorAll("[data-element]");
    for (let element of elements) {
      const name: string = element.dataset.element;
      result[name] = element;
    }

    return result;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }
}
