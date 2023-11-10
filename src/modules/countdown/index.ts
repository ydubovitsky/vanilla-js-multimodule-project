import "./index.scss";

type DataElementsEntityType = {
  [key: string]: HTMLElement;
};

type StateType = {
  goal: string;
  endTime: number;
};

export default class Countdown {
  element: Element;
  dataElements: DataElementsEntityType;
  #state: StateType = {
    goal: "",
    endTime: 0,
  };

  constructor() {
    this.render();
    this.initEvents();
  }

  getTemplate() {
    const html = `
      <div class="countdown" data-element="countdown">
        <div class="content">
          <form class="form" data-element="start-form">
            <label for="goal">Your goal</label>
            <input type=text name="goal" data-element="input-goal"/>
            <label for="date">Pick a date</label>
            <input type=date name="date" data-element="input-date"/>
            <button class="btn" data-element="button-start">Start Countdown</button>
          </form>
          <form class="form unactive" data-element="countdown-form">
            <div class="counter">
              <div>
                <p>Days</p>
                <h1>01</h1>
              </div>
              <div>
                <p>Hours</p>
                <h1>01</h1>
              </div>
              <div>
                <p>Minutes</p>
                <h1>01</h1>
              </div>
              <div>
                <p>Seconds</p>
                <h1>01</h1>
              </div>
            </div>
            <button class="btn" data-element="button-reset">Reset Countdown</button>
          </form>
        </div>
      </div>
    `;

    return html;
  }

  getDataElements(rootElement: Element) {
    const dataElement = rootElement.querySelectorAll("[data-element]");
    this.dataElements = Array.prototype.reduce.call(
      dataElement,
      (prev: DataElementsEntityType, cur: HTMLElement) => ({
        ...prev,
        [cur.dataset.element]: cur,
      }),
      {}
    );
  }

  initEvents(): void {
    this.buttonStartHandler();
    this.buttonResetHandler();
  }

  buttonStartHandler(): void {
    this.dataElements["button-start"].addEventListener(
      "click",
      (e: SubmitEvent) => {
        e.preventDefault();
        this.dataElements["start-form"].classList.add("unactive");
        this.dataElements["countdown-form"].classList.remove("unactive");
      }
    );
  }

  inputGoalHandler(): void {
    this.dataElements["input-goal"].addEventListener("change", (e: Event) => {
      const { target } = e;
      const inputElement = target as HTMLInputElement;
      this.#state.goal = inputElement.value;
    });
  }

  buttonResetHandler(): void {
    this.dataElements["button-reset"].addEventListener(
      "click",
      (e: SubmitEvent) => {
        e.preventDefault();
        this.dataElements["start-form"].classList.remove("unactive");
        this.dataElements["countdown-form"].classList.add("unactive");
      }
    );
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.getTemplate();
    this.element = wrapper.firstElementChild;
    this.getDataElements(this.element);
  }
}
