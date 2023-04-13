import { render, BindingProps } from "dom-component-helper";

const MainMenu = (props: BindingProps) => {
  const { domElement } = props;

  const button = domElement.querySelector("a");
  const container = domElement.querySelector(".hef-menu__container");

  button.addEventListener("click", (evt: Event) => {
    evt.preventDefault();

    container.classList.toggle("hef-menu__container--open");

    button.querySelectorAll("span").forEach((el: Element) => {
      el.classList.toggle("hef-menu__link-text--hidden");
    });
  });
};

export default MainMenu;
