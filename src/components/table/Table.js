import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom.js';
import {createTable} from './table.template.js';
import {resizeHandler} from './table.resize.js';
import {shouldResize, isCell, goNextCell} from './table.functions.js';
import {TableSelection} from './TableSelection.js';
import * as actions from '../../redux/actions';

export class Table extends ExcelComponent {
  static ROWS_AMOUNT = 10;
  static COLS_FIRST_LETTER = 'A';
  static COLS_LAST_LETTER = 'Z';
  static className = 'excel__table';

  constructor(root, options) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'click'],
      subscribes: ['colState'],
      ...options,
    });
    this.selection = new TableSelection;
  }

  init() {
    super.init();
    const cell = this.$root.find('[data-id="A:1"]');
    this.selection.select(cell);
    cell.focus();

    this.$on('formula:input', (data) => this.selection.currentCell.text(data));
  }

  toHTML() {
    return createTable(
        Table.ROWS_AMOUNT,
        Table.COLS_FIRST_LETTER,
        Table.COLS_LAST_LETTER,
        this.store.getState(),
    );
  }

  onClick(e) {
    if (e.target.dataset['cell']) {
      const cell = $(e.target);
      this.selection.select(cell);
      this.$dispatch(actions.inputText({
        currentText: e.target.textContent,
      }));
    }
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
    let newCell = '';

    if (keys.includes(e.key) && !e.shiftKey) {
      e.preventDefault();
      const key = e.key;
      const cell = $(e.target);
      const MAX_COLS = Table.COLS_LAST_LETTER.charCodeAt();
      const MIN_COLS = Table.COLS_FIRST_LETTER.charCodeAt();
      newCell = goNextCell(
          key,
          cell,
          this.$root,
          MAX_COLS,
          MIN_COLS,
          Table.ROWS_AMOUNT,
      );
    }

    if (!newCell) newCell = this.selection.currentCell;
    this.selection.select(newCell);
    newCell.focus();
  }

  onInput(e) {
    this.$dispatch(actions.inputText({
      currentText: e.target.textContent,
      dataState: {
        id: $(e.target).dataset.id,
        textContent: e.target.textContent,
      },
    }));
  }

  async resizeTable(e) {
    const data = await resizeHandler(e, this.$root);
    this.$dispatch(actions.tableResize(data));
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e);
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
