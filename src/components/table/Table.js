import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template.js';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: ['click'],
    });
  }

  toHTML() {
    return createTable(10);
  }

  onClick() {
    console.log('click table');
  }
}
