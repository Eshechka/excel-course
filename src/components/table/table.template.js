import {defaultStyles} from '../../constants';
import {camelToDash, parse} from '../../core/utils.js';

function getWidthCol(colState, colLetter) {
  return (colState[colLetter] || 120) + 'px';
}
function getHeigthRow(state, rowNumber) {
  return (state.rowState[rowNumber] || 24) + 'px';
}

function getCurrentStyles(state, dataId) {
  return {...defaultStyles, ...state.dataStyles[dataId]};
}

function throwWithStyles(state, row = '') {
  return function(colLetter) {
    return {
      colLetter,
      row,
      widthCol: getWidthCol(state.colState, colLetter),
      currentStyles: row === '' ?
        null :
        getCurrentStyles(state, `${colLetter}:${row}`),
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
  function createCell({colLetter, row, widthCol, currentStyles}) {
    let styles = '';
    for (const [key, value] of Object.entries(currentStyles)) {
      const dashKey = camelToDash(key);
      styles += `${dashKey}: ${value}; `;
    }
    return `<div 
    class="cell" 
    contenteditable="" 
    data-col=${colLetter}
    data-cell=true
    data-value="${state.dataState[`${colLetter}:${row}`] || ''}"
    data-id=${colLetter}:${row}
    style="width: ${widthCol}; ${styles}"
    >${parse(state.dataState[`${colLetter}:${row}`]) || ''}</div>`;
  }
  function createChar(_, num) {
    return String.fromCharCode(CODES.from + num);
  }

  cols += new Array(columnsAmount)
      .fill('')
      .map(createChar)
      .map(throwWithStyles(state))
      .map(createCol)
      .join('');

  rows += createRow(null, cols);

  for (let row=1; row<=rowsCount; row++) {
    cells += new Array(columnsAmount)
        .fill('')
        .map(createChar)
        .map(throwWithStyles(state, row))
        .map(createCell)
        .join('');

    const rowHeight = getHeigthRow(state, row);
    rows += createRow(row, cells, rowHeight);
    cells = [];
  }
  return rows;
}
