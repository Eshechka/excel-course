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
    const resizer = rowNumber ?
        `<div class="row__resizer" data-resizer="row"></div>` :
        '';
    return `<div class="row" data-resizable="true">
              <div class="row-info">${rowInfo}
                ${resizer}
              </div>
              <div class="row-data">
                ${columnsMarkup}
              </div>
            </div>`;
  }
  function createCol(colLetter) {
    return `<div class="column" 
              data-resizable="true" 
              data-colletter=${colLetter}>${colLetter}
                <div class="column__resizer" data-resizer="col">
              </div>
            </div>`;
  }
  function createCell(dataCol, dataRow) {
    return `<div 
              class="cell" 
              contenteditable="" 
              data-col=${dataCol}
              data-id=${dataCol}${dataRow}
            ></div>`;
  }
  function createChar(num) {
    return String.fromCharCode(CODES.from + num);
  }

  cols += new Array(columnsAmount)
      .fill('')
      .map((_, ndx) => createChar(ndx))
      .map((item) => createCol(item))
      .join('');

  rows += createRow(null, cols);

  for (let row=1; row<rowsCount; row++) {
    cells += new Array(columnsAmount)
        .fill('')
        .map((_, ndx) => createCell(createChar(ndx), row))
        .join('');

    rows += createRow(row, cells);
  }
  return rows;
}
