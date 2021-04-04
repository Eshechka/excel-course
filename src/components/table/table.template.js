const CODES = {
  from: 65,
  to: 90,
};

export function createTable(rowsCount) {
  let rows = '';
  let cols = '';
  let cells = '';
  const columnsAmount = CODES.to - CODES.from + 1;

  function createRow(rowNumber, columnsMarkup) {
    const rowInfo = rowNumber ? rowNumber : '';
    return `<div class="row">
              <div class="row-info">${rowInfo}</div>
              <div class="row-data">
                ${columnsMarkup}
              </div>
            </div>`;
  }
  function createCol(colLetter) {
    return `<div class="column" data-resizable="true">
              ${colLetter}
              <div class="column__resizer" data-resizer="col"></div>
            </div>`;
  }
  function createCell() {
    return `<div class="cell" contenteditable="">
            </div>`;
  }

  cols += new Array(columnsAmount)
      .fill('')
      .map((item, ndx) => String.fromCharCode(CODES.from + ndx))
      .map((item) => createCol(item))
      .join('');
  cells += new Array(columnsAmount)
      .fill('')
      .map((item) => createCell())
      .join('');

  rows += createRow(null, cols);

  for (let i=1; i<rowsCount; i++) {
    rows += createRow(i, cells);
  }
  return rows;
}

// return `
//   <div class="row">
//     <div class="row-info"></div>
//      <div class="row-data">
//       <div class="column">
//         A
//       </div>
//       <div class="column">
//         B
//       </div>
//     </div>
//   </div>
//   <div class="row">
//     <div class="row-info">
//       1
//     </div>
//     <div class="row-data">
//       <div class="cell selected" contenteditable="">A1</div>
//       <div class="cell" contenteditable="">B2</div>
//       <div class="cell" contenteditable="">C3</div>
//     </div>
//   </div>
