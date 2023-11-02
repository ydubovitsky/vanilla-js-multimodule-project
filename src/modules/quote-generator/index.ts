import { LoremIpsum } from "lorem-ipsum";
import "./index.scss";
import ElementInterface from "../../types/ElementInterface";

type DataElementsEntityType = {
  [key: string]: HTMLElement
}

export default class Quote implements ElementInterface {
  dataElementsEntity: DataElementsEntityType;
  lorem: LoremIpsum;
  interval: NodeJS.Timeout;
  element: HTMLElement;

  constructor() {
    this.lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 2,
        min: 1
      },
      wordsPerSentence: {
        max: 5,
        min: 4
      }
    });
    this.render();
    this.initEvents();
  }

  getLoremIpsumText(): string {
    return this.lorem.generateSentences(5);
  }

  getTemplate() : string {
    const html = `
    <div class="container">
      <div class="quote">
        <h1 class="quote__title" data-element="quote__title">${this.getLoremIpsumText()}</h1>
        <div class="quote__buttons">
          <div class="button" data-element="button__next">Next quote</div>
          <div class="button" data-element="button__start">Start auto</div>
          <div class="button" data-element="button__stop">Stop auto</div>
        </div>
      </div>
    </div>
    `
    return html;
  }

  getDataElements(rootElement: HTMLElement): DataElementsEntityType {
    let dataElementsObject: DataElementsEntityType = {};
    const nodeList: NodeListOf<HTMLElement> = rootElement.querySelectorAll("[data-element]");

    nodeList.forEach(element => {
      dataElementsObject = {
        ...dataElementsObject,
        [element.dataset.element]: element
      }
    })

    return dataElementsObject;
  }

  initEvents(): void {
    Object.keys(this.dataElementsEntity).forEach(key => {
      switch (key) {
        case "button__next": {
          this.dataElementsEntity[key].addEventListener("click", () => {
            this.dataElementsEntity["quote__title"].innerText = this.getLoremIpsumText();
          })
          break;
        }
        case "button__start": {
          this.dataElementsEntity[key].addEventListener("click", () => {
            this.interval = setInterval(() => {
              this.dataElementsEntity["quote__title"].innerText = this.getLoremIpsumText();
            }, 1000)
          })
          break;
        }
        case "button__stop": {
          this.dataElementsEntity[key].addEventListener("click", () => {
            clearInterval(this.interval);
          })
          break;
        }
        default: clearInterval(this.interval);
      }
    })
  }

  render() : void {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.getTemplate();

    this.dataElementsEntity = this.getDataElements(wrapper);
    this.element = wrapper;
  }
}