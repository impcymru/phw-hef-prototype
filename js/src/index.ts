import HelloWorld from './components/helloworld';
import MainMenu from './components/mainmenu';
import Table from './components/table';
import DeleteDialog from './components/deletedialog';
import Accordion from './components/accordion';

import { register, getMap, init } from 'dom-component-helper';

const main = () => {
  const domList = document.querySelectorAll('[data-component]');

  register('helloworld', HelloWorld);
  register('mainmenu', MainMenu);
  register('table', Table);
  register('deletedialog', DeleteDialog);
  register('accordion', Accordion);

  const map = getMap();

  init(map, domList);
};

(() => {
  main();
})();
