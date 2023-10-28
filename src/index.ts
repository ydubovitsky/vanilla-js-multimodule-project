import "./main.scss";
import Routes from "./routes";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement : HTMLElement = document.getElementById("root");
  const routes = new Routes(rootElement);

  rootElement.append(routes.elements.rootNavElement, routes.elements.outlet);
})