const CODES = {
  A: 65,
  Z: 90,
};

function createRow(counter, cols) {
  return `<div class="row">
            <div class="row-info">${counter ? counter : ''}</div>
            <div class="row-data">${cols}</div>
          </div>`;
}
function createCell(cellData) {
  return `<div class="cell" contenteditable>${cellData}</div>`;
}

function createCol(colData) {
  return `<div class="column">${colData}</div>`;
}

export function createTable(rowCount = 1) {
  const countCol = CODES.Z - CODES.A;

  const rows = [];
  let cols = '';
  let cells = '';

  cols = new Array(countCol+1)
      .fill('')
      .map(() => String.fromCharCode(CODES.A++))
      .map(createCol)
      .join('');
  rows.push(createRow(null, cols));
  cells = new Array(countCol+1)
      .fill('')
      .map(createCell)
      .join('');
  for (let i=0; i<rowCount; i++) {
    rows.push(createRow(i+1, cells));
  }

  return rows.join('');
}
