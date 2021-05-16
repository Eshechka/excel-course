import {storage} from '../components/table/table.functions.js';

const defaultState = {
  rowState: {},
  colState: {},
  currentText: '',
  dataState: {},
};

const storageState = storage('excel-state');

export const initialState = storageState ? storageState : defaultState;
