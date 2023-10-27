import { LoremIpsum } from "lorem-ipsum";
import styles from "./index.scss";

export default class Quote {

  constructor() {
    this.interval;
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
  }

  generateText() {
    return this.lorem.generateSentences(5);
  }

  initEvents() {
    const quote__title = document.body.querySelector("[data-title='quote__title']");
    const auto__button = document.body.querySelector("[data-button='auto']");
    const stop__button = document.body.querySelector("[data-button='stop']");
    const next__button = document.body.querySelector("[data-button='next']");

    auto__button.addEventListener("click", () => {
      this.interval = setInterval(() => {
        quote__title.textContent = this.generateText()
      }, 1000)
    })

    stop__button.addEventListener("click", () => {
      clearInterval(this.interval);
    })

    next__button.addEventListener("click", () => {
      quote__title.textContent = this.generateText()
    })
  }

  getTemplate() {
    const html = `
    <div class="container">
      <div class="quote">
        <h1 class="quote__title" data-title="quote__title">${this.generateText()}</h1>
        <div class="quote__buttons">
          <div class="button" data-button="next">Next quote</div>
          <div class="button" data-button="auto">Start auto</div>
          <div class="button" data-button="stop">Stop auto</div>
        </div>
      </div>
    </div>
    `
    return html;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.getTemplate();
    return wrapper.firstElementChild;
  }
}