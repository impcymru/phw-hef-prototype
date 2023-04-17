import { render, BindingProps } from 'dom-component-helper';
import * as nunjucks from 'nunjucks';
import template from './deletedialog.html';

const DeleteDialog = (props: BindingProps) => {
  const { domElement } = props;

  const button = domElement.querySelector('[data-delete-trigger]');
  let dialogContainer = domElement.querySelector('[data-dialog-container]');

  const doRender = () => {
    const output = nunjucks.renderString(template, {});

    const body = document.createElement('div');
    body.innerHTML = output;

    dialogContainer = render(dialogContainer, body);

    dialogContainer
      .querySelector('[data-close-trigger]')
      .addEventListener('click', () => {
        dialogContainer = render(
          dialogContainer,
          document.createElement('div')
        );
      });
  };

  button.addEventListener('click', () => {
    doRender();
  });
};

export default DeleteDialog;
