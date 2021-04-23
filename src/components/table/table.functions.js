export function shouldResize(e) {
  return e.target.dataset.resizer;
}

export function isCell(e) {
  return e.target.dataset.cell;
}

export function goNextCell(key, cell, $root, MAX_COLS, MIN_COLS, ROWS_AMOUNT) {
  let {col, row} = cell.addressCell();
  const colNumber = col.charCodeAt();

  switch (key) {
    case 'ArrowDown':
    case 'Enter':
      row = +row + 1 > ROWS_AMOUNT ? +row : +row + 1;
      break;
    case 'ArrowUp':
      row = +row - 1 < 1 ? +row : +row - 1;
      break;
    case 'ArrowRight':
    case 'Tab':
      col = colNumber + 1 > MAX_COLS ? col : colChange(colNumber, '++');
      break;
    case 'ArrowLeft':
      col = colNumber - 1 < MIN_COLS ? col : colChange(colNumber, '--');
      break;
  }
  return $root.find(`[data-id="${col}:${row}"]`);
}

function colChange(col, type) {
  switch (type) {
    case '++':
      return String.fromCharCode(col + 1);
    case '--':
      return String.fromCharCode(col - 1);
  }
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}
