import { render, BindingProps } from "dom-component-helper";

const HelloWorld = (props: BindingProps) => {
  const body = document.createElement("p");

  body.addEventListener("click", () => {
    props.sendMessage({ body: "Hi from the bus!", type: "message:alert" });
  });

  body.innerHTML = "hello world";

  props.ready((message: unknown) => {
    console.log(message);
  });

  render(props.domElement, body);
};

export default HelloWorld;
