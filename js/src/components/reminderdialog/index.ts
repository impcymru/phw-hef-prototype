import { render, BindingProps } from 'dom-component-helper';
import * as nunjucks from 'nunjucks';
import template from './reminderdialog.html';

const ReminderDialog = (props: BindingProps) => {
  const { domElement } = props;

  let dialogContainer = domElement.querySelector('[data-dialog-container]');

  const doRender = () => {
    const output = nunjucks.renderString(template, {});

    const body = document.createElement('div');
    body.innerHTML = output;

    dialogContainer = render(dialogContainer, body);

    dialogContainer.querySelectorAll('[data-close-trigger]').forEach((el) => {
      el.addEventListener('click', () => {
        dialogContainer = render(
          dialogContainer,
          document.createElement('div')
        );
      });
    });
  };

  doRender();
  console.log('rendering...');
};

export default ReminderDialog;
