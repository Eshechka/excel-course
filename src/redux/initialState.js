import {defaultStyles, defaultTitle} from '../constants';
import {storage} from '../core/utils';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  dataStyles: {},
  currentStyles: defaultStyles,
};

const storageState = storage('excel-state');

export const initialState = storageState ?
  {
    ...defaultState,
    ...storageState,
    currentText: '',
  } :
  defaultState;
