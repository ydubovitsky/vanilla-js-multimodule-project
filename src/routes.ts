import Quote from "./modules/quote-generator";
import InfinityScroll from "./modules/infinity-scroll";

type DataElementsType = {
  [name: string]: HTMLElement
}

type ElementsType = {
  "rootNavElement": Element;
  "outlet": Element
}

export default class Routes {
  #dataElements: DataElementsType;
  elements: ElementsType;
  root: HTMLElement;
  outlet: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.render();
    this.initEvents();
  }

  getTemplate(): string {
    const html = `
      <div class="routes">
        <a href="/quotes-generator" data-element="quotes__generator__href">Quotes Generator</a>
        <a href="/infinity-scroll" data-element="infinity__scroll__href">Infinity Scroll</a>
      </div>
    `
    return html;
  }

  getDataElements(rootElement: HTMLElement) {
    let dataElementsEntity = {};
    const dataElements: NodeListOf<HTMLElement> = rootElement.querySelectorAll("[data-element]");

    dataElements.forEach(element => {
      dataElementsEntity = {
        ...dataElementsEntity,
        [element.dataset.element]: element
      }
    })
    return dataElementsEntity;
  }

  getOutlet(): HTMLElement {
    const localOutlet = document.createElement("div");
    return localOutlet;
  }

  changeLocation(e: MouseEvent) {
    const { target } = e;
    if (target) {
      const href = (target as HTMLLinkElement).href;
      history.pushState(null, null, href);
    }
  }

  initEvents(): void {
    Object.keys(this.#dataElements).forEach(key => {
      switch (key) {
        case "quotes__generator__href": {
          this.#dataElements[key].addEventListener("click", e => {
            e.preventDefault();
            this.outlet.innerHTML = "";
            this.outlet.append(new Quote().element);
            this.changeLocation(e);
          })
          break;
        }
        case "infinity__scroll__href": {
          this.#dataElements[key].addEventListener("click", e => {
            e.preventDefault();
            this.outlet.innerHTML = "";
            this.outlet.append(new InfinityScroll().element);
            this.changeLocation(e);
          })
          break;
        }
        default: null
      }
    })
  }

  //TODO Упрости меня
  render(): void {
    const wrapper: HTMLElement = document.createElement("div");
    wrapper.innerHTML = this.getTemplate();

    this.outlet = this.getOutlet();

    this.#dataElements = this.getDataElements(wrapper);
    this.elements = {
      "rootNavElement": wrapper.firstElementChild,
      "outlet": this.outlet
    };
  }

}