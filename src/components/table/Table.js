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

  onMousedown(e) {
    if (e.target.dataset.resizer) {
      const $resizer = $(e.target);
      const typeResizer = $resizer.dataset.resizer;
      const $resizableElement = $($resizer.closest('[data-resizable="true"]'));
      const dimensions = $resizableElement.getDimensions();
      let value;
      let cellsCol;
      if (typeResizer === 'col') {
        const colLetter = $resizableElement.dataset.colletter;
        cellsCol = this.$root.findAll(`[data-col="${colLetter}"]`);
        cellsCol = Array.from(cellsCol).map((cell) => $(cell));
      }

      document.onmousemove = (e) => {
        if (typeResizer === 'col') {
          const minDelta = dimensions.left - dimensions.right + 40;
          const delta = Math.max(e.pageX - dimensions.right, minDelta);
          value = dimensions.width + delta;
          $resizer.style({
            right: -delta + 'px',
            opacity: 1,
            bottom: '-100vh',
          });
        } else {
          const minDelta = dimensions.top - dimensions.bottom + 20;
          const delta = Math.max(e.pageY - dimensions.bottom, minDelta);
          value = dimensions.height + delta;
          $resizer.style({
            bottom: -delta + 'px',
            opacity: 1,
            right: '-100vw',
          });
        }
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (typeResizer === 'col') {
          $resizableElement.style({width: value + 'px'});
          $resizer.style({
            right: 0,
            opacity: 0,
            bottom: 0,
          });
          cellsCol.forEach((cell) => {
            cell.style({width: value + 'px'});
          });
        } else {
          $resizableElement.style({height: value + 'px'});
          $resizer.style({
            bottom: 0,
            opacity: 0,
            right: 0,
          });
        }
      };
    }
  }
}
