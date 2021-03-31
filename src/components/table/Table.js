import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '../../core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['click', 'mousedown'],
    });
  }

  toHTML() {
    return createTable(15);
  }

  onClick(event) {
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $resizableElement = $resizer.closest('[data-type="resizable"]');
      const colLetter = $resizableElement.$el.textContent.trim();
      console.log('colLetter= ', colLetter);
      const coords = $resizableElement.getCoords();
      const $resizableCells = this.$root.findAll(`[data-col="${colLetter}"]`);
      // this.$root.$el.querySelectorAll(`[data-col="${colLetter}"]`);
      console.log('!!!!! = ', $resizableCells);

      document.onmousemove = (e) => {
        const delta = (e.pageX - coords.right);
        const value = coords.width + delta;
        $resizableElement.styles({width: `${value}px`});
        $resizableCells.forEach((cell) => {
          cell.styles({width: `${value}px`});
        });
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
