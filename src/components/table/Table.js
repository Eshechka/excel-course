import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom.js';
import {createTable} from './table.template.js';
import {resizeHandler} from './table.resize.js';
import {shouldResize, isCell} from './table.functions.js';
import {TableSelection} from './TableSelection.js';

export class Table extends ExcelComponent {
  static ROWS_AMOUNT = 10;
  static COLS_FIRST_LETTER = 'A';
  static COLS_LAST_LETTER = 'Z';
  static className = 'excel__table';

  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
    });
    this.selection = new TableSelection;
  }

  init() {
    super.init();
    const cell = this.$root.find('[data-id="A:1"]');
    this.selection.select(cell);
    cell.focus();
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
      const newCell = goNextCell(key, cell, this.$root);
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

function goNextCell(key, cell, $root) {
  let {col, row} = cell.addressCell();
  const colNumber = col.charCodeAt();
  const MAX_COLS = Table.COLS_LAST_LETTER.charCodeAt();
  const MIN_COLS = Table.COLS_FIRST_LETTER.charCodeAt();

  switch (key) {
    case 'ArrowDown':
    case 'Enter':
      row = +row + 1 > Table.ROWS_AMOUNT ? +row : +row + 1;
      break;
    case 'ArrowUp':
      row = +row - 1 < 1 ? +row : +row - 1;
      break;
    case 'ArrowRight':
    case 'Tab':
      col = colNumber + 1 > MAX_COLS ? col : colChange(colNumber, '++');
      break;
    case 'ArrowLeft':
      col = colNumber - 1 < MIN_COLS ? col : colChange(colNumber, '--');
      break;
  }
  return $root.find(`[data-id="${col}:${row}"]`);
}

function colChange(col, type) {
  switch (type) {
    case '++':
      return String.fromCharCode(col + 1);
    case '--':
      return String.fromCharCode(col - 1);
  }
}
