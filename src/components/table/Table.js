import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom.js';
import {createTable} from './table.template.js';
import {resizeHandler} from './table.resize.js';
import {shouldResize, isCell, goNextCell} from './table.functions.js';
import {TableSelection} from './TableSelection.js';

export class Table extends ExcelComponent {
  static ROWS_AMOUNT = 10;
  static COLS_FIRST_LETTER = 'A';
  static COLS_LAST_LETTER = 'Z';
  static className = 'excel__table';

  constructor(root, options) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
    });
    this.selection = new TableSelection;
  }

  init() {
    super.init();
    const cell = this.$root.find('[data-id="A:1"]');
    this.selection.select(cell);
    cell.focus();
    this.emitter.subscribe(
        'formula:input',
        (data) => this.selection.currentCell.text(data)
    );
  }

  toHTML() {
    return createTable(
        Table.ROWS_AMOUNT,
        Table.COLS_FIRST_LETTER,
        Table.COLS_LAST_LETTER
    );
  }

  onKeydown(e) {
    const keys = [
      'ArrowDown',
      'ArrowUp',
      'ArrowLeft',
      'ArrowRight',
      'Enter',
      'Tab',
    ];

    if (keys.includes(e.key) && !e.shiftKey) {
      e.preventDefault();
      const key = e.key;
      const cell = $(e.target);
      const MAX_COLS = Table.COLS_LAST_LETTER.charCodeAt();
      const MIN_COLS = Table.COLS_FIRST_LETTER.charCodeAt();
      const newCell = goNextCell(
          key,
          cell,
          this.$root,
          MAX_COLS,
          MIN_COLS,
          Table.ROWS_AMOUNT,
      );
      this.selection.select(newCell);
      newCell.focus();
    }
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(e, this.$root);
    } else if (isCell(e)) {
      const cell = $(e.target);
      if (e.shiftKey) {
        this.selection.selectGroup(cell, this.$root);
      } else {
        this.selection.select(cell);
      }
    }
  }
}
