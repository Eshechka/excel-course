export class TableSelection {
  constructor() {
    this.selectedGroup = [];
    this.selectedGroupObject = {};
  }

  select($el) {
    this.unSelectAll();
    this.selectedGroup.push($el);
    $el.addClass('selected');
  }
  unSelectAll() {
    this.selectedGroup.forEach((cell) => {
      cell.removeClass('selected');
    });
    this.selectedGroup = [];
    this.selectedGroupObject = {};
  }
  selectGroup($el, $root) {
    if (this.selectedGroup.length === 0) {
      this.select($el);
    } else {
      if (!this.selectedGroupObject.leftLetter) {
        const selectedCell = this.selectedGroup[0];
        const letter = selectedCell.dataset.id.slice(0, 1);
        const number = selectedCell.dataset.id.slice(-1);
        this.selectedGroupObject = {
          leftLetter: letter,
          rightLetter: letter,
          minNumber: number,
          maxNumber: number,
        };
        selectedCell.removeClass('selected');
      }
      const letterNew = $el.dataset.id.slice(0, 1);
      const numberNew = $el.dataset.id.slice(-1);
      let letterOld = '';
      let numberOld = '';
      switch (true) {
        case letterNew <= this.selectedGroupObject.leftLetter:
          letterOld = this.selectedGroupObject.leftLetter;
          break;
        case letterNew >= this.selectedGroupObject.rightLetter:
          letterOld = this.selectedGroupObject.rightLetter;
          break;
        default:
          letterOld = this.selectedGroupObject.leftLetter;
      }
      switch (true) {
        case numberNew <= this.selectedGroupObject.minNumber:
          numberOld = this.selectedGroupObject.minNumber;
          break;
        case numberNew >= this.selectedGroupObject.maxNumber:
          numberOld = this.selectedGroupObject.maxNumber;
          break;
        default:
          numberOld = this.selectedGroupObject.minNumber;
      }

      const fromNumber = Math.min(numberOld, numberNew);
      const toNumber = Math.max(numberOld, numberNew);
      const fromLetter = minLetter(letterOld, letterNew);
      const toLetter = maxLetter(letterOld, letterNew);

      this.selectedGroup = [];

      for (let number = fromNumber; number <= toNumber; number++) {
        for (let letter = fromLetter; letter <= toLetter; letter++) {
          const cellId = `${String.fromCharCode(letter)}${number}`;
          const $cell = $root.find(`[data-id="${cellId}"]`);
          // console.log(cellId);
          this.selectedGroup.push($cell);
          $cell.addClass('selected-group');
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
