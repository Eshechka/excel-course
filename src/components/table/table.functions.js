export function shouldResize(e) {
  return e.target.dataset.resizer;
}

export function isCell(e) {
  return e.target.dataset.cell;
}
