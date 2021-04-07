import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template.js';
import {resizeHandler} from './table.resize.js';
import {shouldResize} from './table.functions.js';
import {TableSelection} from './TableSelection.js';
import {$} from '../../core/dom.js';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'click'],
    });
    this.selection = new TableSelection;
  }

  init() {
    super.init();
    // const selection = new TableSelection;
    const cell = this.$root.find('[data-id="A1"]');
    this.selection.select(cell);
  }

  toHTML() {
    return createTable(10);
  }

  onClick(e) {
    if (e.target.dataset.id) {
      console.log(e.target);
      const cell = $(e.target);
      this.selection.unSelectAll();
      this.selection.select(cell);
    }
  }
  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(e, this.$root);
    }
  }
}
