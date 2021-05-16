import {TABLE_RESIZE} from './typesActions';
import {INPUT_TEXT} from './typesActions';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}

export function inputText(data) {
  return {
    type: INPUT_TEXT,
    data,
  };
}
