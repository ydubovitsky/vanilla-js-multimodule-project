import ElementInterface from "./types/ElementInterface";

type DataElementsType = {
  [name: string]: HTMLElement;
};

//TODO Имя поменяй
type ElementsType = {
  rootNavElement: Element;
  outlet: Element;
};

export default class Routes {
  #dataElements: DataElementsType;
  elements: ElementsType;
  root: HTMLElement;
  outlet: HTMLElement;

  //TODO Вынести в отдельный интерфейс
  routeMap: Map<string, ElementInterface>;

  constructor(root: HTMLElement, routeMap: Map<string, ElementInterface>) {
    this.root = root;
    this.routeMap = routeMap;
    this.render();
    this.initEvents();
  }

  getTemplate(): string {
    const getHrefElements = () => {
      return Array.from(
        this.routeMap,
        ([key, value]) => `<a href="/${key}" data-element="${key}">${key}</a>`
      ).reduce((prev, cur) => prev + cur, "");
    };

    const html = `
      <div class="routes">
        ${getHrefElements()}
      </div>
    `;
    return html;
  }

  getDataElements(rootElement: HTMLElement) {
    let dataElementsEntity = {};
    const dataElements: NodeListOf<HTMLElement> =
      rootElement.querySelectorAll("[data-element]");

    dataElements.forEach((element) => {
      dataElementsEntity = {
        ...dataElementsEntity,
        [element.dataset.element]: element,
      };
    });
    return dataElementsEntity;
  }

  getOutlet(): HTMLElement {
    const localOutlet = document.createElement("div");
    localOutlet.style.position = "relative";
    return localOutlet;
  }

  initEvents(): void {
    const replaceContent = (content: Element) => {
      this.outlet.innerHTML = "";
      this.outlet.append(content);
    }

    const changeLocation = (e: MouseEvent) => {
      const { target } = e;
      if (target) {
        const href = (target as HTMLLinkElement).href;
        history.pushState(null, null, href);
      }
    }

    Object.keys(this.#dataElements).map((key) => {
      const object = this.routeMap.get(key);

      this.routeMap.get(key) &&
        this.#dataElements[key].addEventListener("click", (e) => {
          e.preventDefault();
          replaceContent(object.element);
          changeLocation(e);
        });
    });
  }

  //TODO Упрости меня
  render(): void {
    const wrapper: HTMLElement = document.createElement("div");
    wrapper.innerHTML = this.getTemplate();

    this.outlet = this.getOutlet();

    this.#dataElements = this.getDataElements(wrapper);
    this.elements = {
      rootNavElement: wrapper.firstElementChild,
      outlet: this.outlet,
    };
  }
}
