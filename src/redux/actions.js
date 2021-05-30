import {
  TABLE_RESIZE,
  INPUT_TEXT,
  APPLY_STYLE,
  GET_STYLES,
  CHANGE_TITLE,
} from './typesActions';

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

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  };
}

export function getStyles(data) {
  return {
    type: GET_STYLES,
    data,
  };
}

export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data,
  };
}
