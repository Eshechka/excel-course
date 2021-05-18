function getWidthCol(colState, colLetter) {
  return (colState[colLetter] || 120) + 'px';
}
function getHeigthRow(state, rowNumber) {
  return (state.rowState[rowNumber] || 24) + 'px';
}

function throwWithSizes(state, row = '') {
  return function(colLetter) {
    return {
      colLetter,
      row,
      widthCol: getWidthCol(state.colState, colLetter),
    };
  };
}

export function createTable(
    rowsCount,
    colsFirstLetter,
    colsLastLetter,
    state = {}) {
  const CODES = {
    from: colsFirstLetter.charCodeAt(),
    to: colsLastLetter.charCodeAt(),
  };

  let rows = '';
  let cols = '';
  let cells = '';
  const columnsAmount = CODES.to - CODES.from + 1;

  function createRow(rowNumber, columnsMarkup, rowHeight) {
    const rowInfo = rowNumber ? rowNumber : '';
    const resizer = rowNumber ?
        `<div class="row__resizer" data-resizer="row"></div>` :
        '';
    return `<div class="row" data-resizable="true" data-rownumber=${rowInfo}
            style="height: ${rowHeight}"
            >
              <div class="row-info">${rowInfo}
                ${resizer}
              </div>
              <div class="row-data">
                ${columnsMarkup}
              </div>
            </div>`;
  }
  function createCol({colLetter, widthCol}) {
    return `<div class="column" 
    data-resizable="true" 
    data-colletter=${colLetter}
    style="width: ${widthCol}">
      ${colLetter}
      <div class="column__resizer" data-resizer="col">
      </div>
    </div>`;
  }
  function createCell({colLetter, row, widthCol}) {
    return `<div 
    class="cell" 
    contenteditable="" 
    data-col=${colLetter}
    data-cell=true
    data-id=${colLetter}:${row}
    style="width: ${widthCol}"
    >${state.dataState[`${colLetter}:${row}`] || ''}</div>`;
  }
  function createChar(_, num) {
    return String.fromCharCode(CODES.from + num);
  }

  cols += new Array(columnsAmount)
      .fill('')
      .map(createChar)
      .map(throwWithSizes(state))
      .map(createCol)
      .join('');

  rows += createRow(null, cols);

  for (let row=1; row<=rowsCount; row++) {
    cells += new Array(columnsAmount)
        .fill('')
        .map(createChar)
        .map(throwWithSizes(state, row))
        .map(createCell)
        .join('');

    const rowHeight = getHeigthRow(state, row);
    rows += createRow(row, cells, rowHeight);
    cells = [];
  }
  return rows;
}
