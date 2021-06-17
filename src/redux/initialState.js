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
  lastOpened: new Date().toJSON(),
};

export function initialState(stateKey) {
  const storageState = storage(stateKey);
  return storageState ?
  {
    ...defaultState,
    ...storageState,
    currentText: '',
  } :
  {...defaultState};
}
