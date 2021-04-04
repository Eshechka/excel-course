import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template.js';
import {$} from '../../core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(10);
  }

  // onClick() {
  //   console.log('click table');
  // }
  onMousedown(e) {
    if (e.target.dataset.resizer==='col') {
      const $resizer = $(e.target);
      const $resizableElement = $($resizer.closest('[data-resizable="true"]'));
      console.log('$resizableElement', $resizableElement);
      const dimensions = $resizableElement.getDimensions();
      console.log('dimensions', dimensions);

      document.onmousemove = (e) => {
        const delta = e.pageX - dimensions.right;
        $resizableElement.style({width: dimensions.width + delta + 'px'});
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
