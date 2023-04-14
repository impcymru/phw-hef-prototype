import { render, BindingProps } from 'dom-component-helper';
import * as nunjucks from 'nunjucks';
import template from './table.html';

const Table = (props: BindingProps) => {
  const { rows, headers } = JSON.parse(props.data);
  const env = new nunjucks.Environment();
  let element = props.domElement;

  let limit = 10;
  let offset = 0;
  let sortCol = headers[0].key;

  const filter = (rawRows: unknown[]) => {
    const newRows = rawRows.slice().sort((a: any, b: any) => {
      console.log(a[sortCol], b[sortCol]);
      return a[sortCol] > b[sortCol] ? 1 : -1;
    });

    console.log(newRows);

    return newRows.slice(offset, offset + limit);
  };

  const pagination = () => {
    return {
      offset: offset + 1,
      limit: offset + 10,
      total: rows.length,
    };
  };

  const doRender = () => {
    const output = nunjucks.renderString(template, {
      rows: filter(rows),
      headers,
      pagination: pagination(),
    });

    const body = document.createElement('div');
    body.innerHTML = output;

    element = render(element, body);

    body.querySelector('[data-paginate-left]').addEventListener('click', () => {
      if (offset > 0) {
        offset -= limit;
      }

      doRender();
    });

    body
      .querySelector('[data-paginate-right]')
      .addEventListener('click', () => {
        if (offset < rows.length) {
          offset += limit;
        }

        doRender();
      });

    body.querySelector('[data-sort]').addEventListener('click', (evt: any) => {
      const key = evt.target.getAttribute('data-sort');
      sortCol = key;

      console.log('sorting...');
      doRender();
    });
  };

  doRender();
};

export default Table;
