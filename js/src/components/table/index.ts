import { render, BindingProps } from 'dom-component-helper';
import * as nunjucks from 'nunjucks';
import template from './table.html';

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

const Table = (props: BindingProps) => {
  const { rows, headers } = JSON.parse(props.data);
  const config = JSON.parse(props.config);

  const env = new nunjucks.Environment();
  let element = props.domElement;

  let limit = config.limit || 10;
  let offset = 0;
  let sortCol = headers[0].key;
  let order = Order.ASC;

  const filter = (rawRows: unknown[]) => {
    const newRows = rawRows.slice().sort((a: any, b: any) => {
      if (order === Order.ASC) {
        return a[sortCol] > b[sortCol] ? 1 : -1;
      }

      return a[sortCol] > b[sortCol] ? -1 : 1;
    });

    return newRows.slice(offset, offset + limit);
  };

  const pagination = () => {
    return {
      offset: offset + 1,
      limit: offset + limit,
      total: rows.length,
    };
  };

  const doRender = () => {
    const output = nunjucks.renderString(template, {
      rows: filter(rows),
      headers,
      pagination: pagination(),
      sortCol,
      order,
      selectable: config.selectable || false,
    });

    const body = document.createElement('div');
    body.innerHTML = output;

    element = render(element, body);

    element.querySelectorAll('[data-select]').forEach((el: Element) => {
      const row = el.closest('tr');

      el.addEventListener('change', (evt: Event) => {
        const currentTarget = evt.currentTarget as any;

        if (currentTarget.checked) {
          row.classList.add('hef-table__row--selected');
        } else {
          row.classList.remove('hef-table__row--selected');
        }
      });
    });

    element
      .querySelector('[data-paginate-left]')
      .addEventListener('click', () => {
        if (offset > 0) {
          offset -= limit;
        }

        doRender();
      });

    element
      .querySelector('[data-paginate-right]')
      .addEventListener('click', () => {
        if (offset < rows.length) {
          offset += limit;
        }

        doRender();
      });

    element.querySelectorAll('[data-sort]').forEach((el) => {
      const key = el.getAttribute('data-sort');
      el.addEventListener('click', (evt: any) => {
        if (key === sortCol) {
          order = order === Order.ASC ? Order.DESC : Order.ASC;
        } else {
          order = Order.ASC;
          sortCol = key;
        }

        offset = 0;

        doRender();
      });
    });
  };

  doRender();
};

export default Table;
