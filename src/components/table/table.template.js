function getWidthCol(colState, colLetter) {
  return colState[colLetter] || 120;
}

export function createTable(
    rowsCount,
    colsFirstLetter,
    colsLastLetter,
    colState = {}) {
  const CODES = {
    from: colsFirstLetter.charCodeAt(),
    to: colsLastLetter.charCodeAt(),
  };

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
  function createCol(colLetter, widthCol) {
    return `<div class="column" 
    data-resizable="true" 
    data-colletter=${colLetter}
    style="width: ${widthCol}px">
      ${colLetter}
      <div class="column__resizer" data-resizer="col">
      </div>
    </div>`;
  }
  function createCell(dataCol, dataRow, widthCol) {
    return `<div 
    class="cell" 
    contenteditable="" 
    data-col=${dataCol}
    data-cell=true
    data-id=${dataCol}:${dataRow}
    style="width: ${widthCol}px"
    ></div>`;
  }
  function createChar(num) {
    return String.fromCharCode(CODES.from + num);
  }

  cols += new Array(columnsAmount)
      .fill('')
      .map((_, ndx) => createChar(ndx))
      .map((item) => {
        const widthCol = getWidthCol(colState, item);
        return createCol(item, widthCol);
      })
      .join('');

  rows += createRow(null, cols);

  for (let row=1; row<=rowsCount; row++) {
    cells += new Array(columnsAmount)
        .fill('')
        .map((_, ndx) => {
          const colLetter = createChar(ndx);
          const widthCol = getWidthCol(colState, colLetter);
          return createCell(colLetter, row, widthCol);
        })
        .join('');

    rows += createRow(row, cells);
    cells = [];
  }
  return rows;
}
