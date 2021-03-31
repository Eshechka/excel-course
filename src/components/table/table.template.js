const CODES = {
  A: 65,
  Z: 90,
};

function createRow(counter, cols) {
  const resizer = counter ?
        `<div class="row-resize" data-resize="row"></div>` :
        '';
  return `<div class="row">
            <div class="row-info" data-type="resizable">
              ${counter ? counter : ''}
              ${resizer}
            </div>
            <div class="row-data">${cols}</div>
          </div>`;
}
function createCell(cellData, ndx) {
  const dataCol = toChar(null, ndx);
  return `<div class="cell" contenteditable data-col="${dataCol}">
    ${cellData}
  </div>`;
}

function createHeaderCol(colData) {
  return `<div class="column" data-type="resizable">
    ${colData}
    <div class="col-resize" data-resize="col"></div>
  </div>`;
}

function toChar(_, ndx) {
  return String.fromCharCode(CODES.A + ndx);
}

export function createTable(countRow = 10) {
  const countCol = CODES.Z - CODES.A;

  const rows = [];
  let cols = '';
  let cells = '';

  cols = new Array(countCol+1)
      .fill('')
      .map(toChar)
      .map(createHeaderCol)
      .join('');
  rows.push(createRow(null, cols));
  cells = new Array(countCol+1)
      .fill('')
      .map(createCell)
      .join('');
  for (let i=0; i<countRow; i++) {
    rows.push(createRow(i+1, cells));
  }

  return rows.join('');
}
