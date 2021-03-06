import {$} from '../../core/dom';

export function resizeHandler(e, $root) {
  return new Promise((resolve) => {
    const $resizer = $(e.target);
    const typeResizer = $resizer.dataset.resizer;
    const $resizableElement = $($resizer.closest('[data-resizable="true"]'));
    const dimensions = $resizableElement.getDimensions();
    let value;
    let cellsCol;
    if (typeResizer === 'col') {
      const colLetter = $resizableElement.dataset.colletter;
      cellsCol = $root.findAll(`[data-col="${colLetter}"]`);
      cellsCol = Array.from(cellsCol).map((cell) => $(cell));
    }

    document.onmousemove = (e) => {
      if (typeResizer === 'col') {
        const minDelta = dimensions.left - dimensions.right + 40;
        const delta = Math.max(e.pageX - dimensions.right, minDelta);
        value = dimensions.width + delta;
        $resizer.style({
          right: -delta + 'px',
          opacity: 1,
          bottom: '-100vh',
        });
      } else {
        const minDelta = dimensions.top - dimensions.bottom + 20;
        const delta = Math.max(e.pageY - dimensions.bottom, minDelta);
        value = dimensions.height + delta;
        $resizer.style({
          bottom: -delta + 'px',
          opacity: 1,
          right: '-100vw',
        });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      let id = '';
      if (typeResizer === 'col') {
        $resizableElement.style({width: value + 'px'});
        cellsCol.forEach((cell) => {
          cell.style({width: value + 'px'});
        });
        id = $resizableElement.dataset['colletter'];
      } else {
        $resizableElement.style({height: value + 'px'});
        id = $resizableElement.dataset['rownumber'];
      }

      resolve({[`${id}`]: value, type: typeResizer});

      $resizer.style({
        right: 0,
        opacity: 0,
        bottom: 0,
      });
    };
  });
}
