import getImageRequest, { ImageInterface } from "./image-service"
import "./index.scss";

type DataElementType = {
  [name: string]: HTMLElement
}

export default class InfinityScroll {
  element: Element;
  #dataElements: DataElementType;
  #isLoading: boolean;
  #loadedCount: number = 0;

  constructor() {
    this.render();
    this.getImagesAsync();
    this.initEvents();
  }

  getTemplate(): string {
    const html = `
      <div class="infinity-scroll">
        <h1>Infinity Scroll</h1>
        <div class="image-container" data-element="image__container">
        </div>
      </div>
    `

    return html;
  }

  getDataElements(rootElement: Element) {
    let result: DataElementType = {};
    const elements: NodeListOf<HTMLElement> = rootElement.querySelectorAll('[data-element]');
    for (let element of elements) {
      const name: string = element.dataset.element;
      result[name] = element;
    }

    this.#dataElements = result;
  }

  constructImageElement(imageItem: ImageInterface) : HTMLImageElement {
    const imageVirtualElement = document.createElement("img");
    imageVirtualElement.setAttribute("src", imageItem.url);
    imageVirtualElement.setAttribute("data-element", imageItem.id + "img");
    imageVirtualElement.setAttribute("alt", "There is no")

    imageVirtualElement.addEventListener("load", e => {
      this.#loadedCount = this.#loadedCount + 1;
      console.log(`Count of loaded images: ${this.#loadedCount}`);
    })
    return imageVirtualElement;
  }

  async getImagesAsync() {
    try {
      this.#isLoading = true;
      const images: HTMLImageElement[] = await getImageRequest().then(response => {
        const { data } = response;
        return data.map(imageItem => this.constructImageElement(imageItem))
      });
      this.#isLoading = false;
      this.updateContent(images)
    } catch (error) {
      console.log("Image service unavailable")
    }
  }

  updateContent(images: HTMLImageElement[]) {
    const imageContainerElement: HTMLElement = this.#dataElements["image__container"];
    imageContainerElement.append(...images);
  }

  initEvents() {
    window.addEventListener("scroll", (e: Event) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && this.#isLoading === false) {
        this.getImagesAsync();
      }
    })
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
    this.getDataElements(this.element);
  }
}