import "./main.scss";
import InfinityScroll from "./modules/infinity-scroll";
import Quote from "./modules/quote-generator";
import Routes from "./routes";
import Countdown from "./modules/countdown";
import ElementInterface from "./types/ElementInterface";

document.addEventListener("DOMContentLoaded", () => {
  
  const ROUTE_MAP = new Map<string, ElementInterface>();
  ROUTE_MAP.set("quotes generator", new Quote());
  ROUTE_MAP.set("infinity scroll", new InfinityScroll());
  ROUTE_MAP.set("countdown", new Countdown());

  const rootElement: HTMLElement = document.getElementById("root");
  const routes = new Routes(rootElement, ROUTE_MAP);

  rootElement.append(routes.elements.rootNavElement, routes.elements.outlet);
});
