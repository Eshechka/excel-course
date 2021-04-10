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
      const currentLetter = selectedCell.dataset.id.slice(0, 1);
      const currentNumber = selectedCell.dataset.id.slice(-1);
      selectedCell.removeClass('selected');

      const nowLetter = $el.dataset.id.slice(0, 1);
      const nowNumber = $el.dataset.id.slice(-1);

      const fromNumber = Math.min(currentNumber, nowNumber);
      const toNumber = Math.max(currentNumber, nowNumber);
      const fromLetter = minLetter(currentLetter, nowLetter);
      const toLetter = maxLetter(currentLetter, nowLetter);

      this.unSelectAll();
      this.selectedGroup = [];

      for (let number = fromNumber; number <= toNumber; number++) {
        for (let letter = fromLetter; letter <= toLetter; letter++) {
          const cellId = `${String.fromCharCode(letter)}${number}`;
          const $cell = $root.find(`[data-id="${cellId}"]`);
          this.selectedGroup.push($cell);
          $cell.addClass(TableSelection.classGroupSelected);
        }
      }
      console.log('this.selectedGroup', this.selectedGroup);
    }
  }
}

function minLetter(letter1, letter2) {
  return Math.min(letter1.charCodeAt(), letter2.charCodeAt());
}
function maxLetter(letter1, letter2) {
  return Math.max(letter1.charCodeAt(), letter2.charCodeAt());
}
