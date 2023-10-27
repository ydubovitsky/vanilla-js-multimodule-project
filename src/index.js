import "./main.scss";
import Quote from "./modules/quote-generator";

document.addEventListener("DOMContentLoaded", () => {
  const quote = new Quote();
  const root = document.getElementById("root");

  root.append(quote.render());
  quote.initEvents();
})