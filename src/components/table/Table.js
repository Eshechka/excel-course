import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom.js';
import {createTable} from './table.template.js';
import {resizeHandler} from './table.resize.js';
import {shouldResize, isCell} from './table.functions.js';
import {TableSelection} from './TableSelection.js';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown'],
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

  // onClick(e) {
  //   if (isCell(e)) {
  //     console.log(e.target);
  //     const cell = $(e.target);
  //     this.selection.unSelectAll();
  //     this.selection.select(cell);
  //   }
  // }
  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(e, this.$root);
    } else if (isCell(e)) {
      // console.log(e);
      const cell = $(e.target);
      if (e.shiftKey) {
        this.selection.selectGroup(cell, this.$root);
      } else {
        this.selection.select(cell);
      }
    }
  }
}
