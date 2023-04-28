import { render, BindingProps } from '@sfdl/blep';
import * as nunjucks from 'nunjucks';
import template from './accordion.html';

const Accordion = (props: BindingProps) => {
  const component = document.createElement('div');

  const data = JSON.parse(props.data);
  const config = JSON.parse(props.config);

  const content = nunjucks.renderString(template, { data, config });

  component.innerHTML = content;

  const output = render(props.domElement, component);

  const parent = output.querySelector('[data-trigger]');

  parent.addEventListener('click', (evt: Event) => {
    const el = evt.target as Element;
    const parent = el
      .closest('.hef-expander')
      .classList.toggle('hef-expander--closed');
  });

  output.querySelectorAll('[data-sub-trigger]').forEach((el) => {
    el.addEventListener('click', (evt: Event) => {
      const el = evt.target as Element;
      const parent = el
        .closest('.hef-sub-expander')
        .classList.toggle('hef-sub-expander--closed');
    });
  });

  output.querySelectorAll('[data-radio]').forEach((radio) => {
    radio.addEventListener('change', () => {
      parent
        .querySelector('.check-icon')
        .classList.remove('check-icon--hidden');
    });
  });

  output.querySelectorAll('[data-trigger-note]').forEach((note) => {
    note.addEventListener('click', (evt: Event) => {
      evt.preventDefault();
    });
  });
};

export default Accordion;
