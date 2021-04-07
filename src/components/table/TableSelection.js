export class TableSelection {
  constructor() {
    this.selectGroup = [];
  }

  select($el) {
    // console.log($el);
    this.selectGroup.push($el);
    $el.addClass('selected');
  }
  unSelectAll() {
    this.selectGroup.forEach((cell) => {
      cell.removeClass('selected');
    });
  }
  selectGroup() {
    // this.selectGroup.push($el);
  }
}
