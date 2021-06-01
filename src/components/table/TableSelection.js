export class TableSelection {
  static classSelected = 'selected';
  static classGroupSelected = 'selected-group';

  constructor() {
    this.currentCell = '';
    this.selectedGroup = [];
  }

  select($el) {
    this.unSelectAll();
    this.selectedGroup = [];
    this.currentCell = $el;
    this.selectedGroup.push($el);
    $el.addClass(TableSelection.classSelected);
  }
  unfocus() {
    this.currentCell.removeClass(TableSelection.classSelected);
  }
  focus() {
    this.currentCell.addClass(TableSelection.classSelected);
    this.currentCell.focus();
  }
  unSelectAll() {
    if (this.selectedGroup.length === 1) {
      this.selectedGroup.forEach((cell) => {
        cell.removeClass(TableSelection.classSelected);
      });
    } else if (this.selectedGroup.length > 1) {
      this.selectedGroup.forEach((cell) => {
        cell.removeClass(TableSelection.classGroupSelected);
      });
    }
  }
  selectGroup($el, $root) {
    if (this.selectedGroup.length === 0) {
      this.select($el);
    } else {
      const selectedCell = this.currentCell;
      const currentLetter = selectedCell.addressCell().col;
      const currentNumber = selectedCell.addressCell().row;
      selectedCell.removeClass('selected');

      const nowLetter = $el.addressCell().col;
      const nowNumber = $el.addressCell().row;

      const fromNumber = Math.min(currentNumber, nowNumber);
      const toNumber = Math.max(currentNumber, nowNumber);
      const fromLetter = minLetter(currentLetter, nowLetter);
      const toLetter = maxLetter(currentLetter, nowLetter);

      this.unSelectAll();
      this.selectedGroup = [];

      for (let number = fromNumber; number <= toNumber; number++) {
        for (let letter = fromLetter; letter <= toLetter; letter++) {
          const cellId = `${String.fromCharCode(letter)}:${number}`;
          const $cell = $root.find(`[data-id="${cellId}"]`);
          this.selectedGroup.push($cell);
          $cell.addClass(TableSelection.classGroupSelected);
        }
      }
    }
  }

  applyStyles(style) {
    this.selectedGroup.forEach((cell) => {
      cell.style(style);
    });
  }

  get selectedIds() {
    return this.selectedGroup.map(($el) => {
      return $el.dataset.id;
    });
  }
}

function minLetter(letter1, letter2) {
  return Math.min(letter1.charCodeAt(), letter2.charCodeAt());
}
function maxLetter(letter1, letter2) {
  return Math.max(letter1.charCodeAt(), letter2.charCodeAt());
}
