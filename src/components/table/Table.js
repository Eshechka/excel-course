import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template.js';
import {resizeHandler} from './table.resize.js';
import {shouldResize} from './table.functions.js';

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
    if (shouldResize(e)) {
      resizeHandler(e, this.$root);
    }
  }
}
