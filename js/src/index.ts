import HelloWorld from "./components/helloworld";
import { register, getMap, init } from "dom-component-helper";

const main = () => {
  const domList = document.querySelectorAll("[data-component]");

  register("helloworld", HelloWorld);

  const map = getMap();

  init(map, domList);
};

(() => {
  main();
})();
