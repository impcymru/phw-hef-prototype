import MainMenu from './components/mainmenu';
import Table from './components/table';
import DeleteDialog from './components/deletedialog';
import Accordion from './components/accordion';
import BarChart from './components/barchart';
import RadarChart from './components/radarchart';
import ReminderDialog from './components/reminderdialog';
import CompareDialog from './components/comparedialog';

import { register, getMap, init } from '@sfdl/blep';

const main = () => {
  const domList = document.querySelectorAll('[data-component]');
  register('mainmenu', MainMenu);
  register('table', Table);
  register('deletedialog', DeleteDialog);
  register('accordion', Accordion);
  register('barchart', BarChart);
  register('radarchart', RadarChart);
  register('reminderdialog', ReminderDialog);
  register('comparedialog', CompareDialog);

  const map = getMap();

  init(map, domList);
};

(() => {
  main();
})();
