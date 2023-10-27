import "./main.scss";

function component(text : string) : HTMLHeadingElement {
  const element : HTMLHeadingElement = document.createElement('h1');
  element.textContent = text;
  return element;
}

document.body.prepend(component('Проект собран на Webpack!'));