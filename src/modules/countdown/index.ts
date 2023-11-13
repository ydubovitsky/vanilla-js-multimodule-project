import "./index.scss";
import LocalStorageService from "./localstorage";

type DataElementsEntityType = {
  [key: string]: HTMLElement;
};

type StateType = {
  goal: string;
  endTime: string;
  countDownInterval: NodeJS.Timeout;
};

type CountdownDateType = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export default class Countdown {
  element: Element;
  #countdownKey: "countdown";
  dataElements: DataElementsEntityType;
  #state: StateType = {
    goal: "",
    endTime: "",
    countDownInterval: null,
  };

  constructor() {
    this.render();
    this.initEvents();
    this.onInit();
  }

  onInit() {
    const savedCountDown: CountdownDateType = JSON.parse(
      LocalStorageService.loadFromLocalStorage(this.#countdownKey)
    );
    if (savedCountDown) {
      console.log("Countdown data loaded!");
      //!TODO logic add
    }
  }

  getTemplate() {
    const html = `
      <div class="countdown" data-element="countdown">
        <div class="content">
          <form class="form" data-element="start-form">
            <label for="goal">Your goal</label>
            <input type=text name="goal" data-element="input-goal"/>
            <label for="endTime">Pick a date</label>
            <input type=date name="endTime" data-element="input-date"/>
            <button class="btn" data-element="button-start">Start Countdown</button>
          </form>
          <form class="form unactive" data-element="countdown-form">
            <h1 data-element="goal"></h1>
            <div class="counter">
              ${["days", "hours", "minutes", "seconds"]
                .map(
                  (key) =>
                    `<div class="counter-item">
                  <p>${key}</p>
                  <h1 data-element="${key}">01</h1>
                </div>`
                )
                .reduce((prev, cur) => prev + cur, "")}
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

        this.#state = this.mapFormDataToObject(
          new FormData(this.dataElements["start-form"] as HTMLFormElement)
        ) as StateType;

        this.#updateTemplate();
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

        // move to foreign function
        clearInterval(this.#state.countDownInterval);
        LocalStorageService.removeFromLocalStorage(this.#countdownKey);
        console.log("Interval removed");
      }
    );
  }

  #updateTemplate() {
    const interval = setInterval(() => {
      const start = Date.now();
      const end = new Date(this.#state.endTime).getTime();
      const countDown: CountdownDateType = this.#calculateEndDate(start, end);

      LocalStorageService.saveToLocalStorage(
        this.#countdownKey,
        JSON.stringify(countDown)
      );
      this.#updateHtmlTemplate(this.#state.goal, countDown);
    }, 1000);

    this.#state = {
      ...this.#state,
      countDownInterval: interval,
    };
  }

  #updateHtmlTemplate(goal: string, countdown: CountdownDateType) {
    const { days, hours, minutes, seconds } = countdown;

    this.dataElements["goal"].textContent = goal;
    this.dataElements["days"].textContent = days;
    this.dataElements["hours"].textContent = hours;
    this.dataElements["minutes"].textContent = minutes;
    this.dataElements["seconds"].textContent = seconds;
  }

  #calculateEndDate(start: number, end: number): CountdownDateType {
    const ms: number = end - start;

    const days = Math.floor(ms / (24 * 60 * 60 * 1000)).toString();
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000)).toString();
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000)).toString();
    const minutesms = ms % (60 * 1000);
    const seconds = Math.floor(minutesms / 1000).toString();

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  mapFormDataToObject(formData: FormData): object {
    return Array.from(formData.entries()).reduce((prev, cur) => {
      return (prev = {
        ...prev,
        [cur[0]]: cur[1],
      });
    }, {});
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.getTemplate();
    this.element = wrapper.firstElementChild;
    this.getDataElements(this.element);
  }
}
