import {TABLE_RESIZE, INPUT_TEXT} from './typesActions';

export function rootReducer(state, action) {
  // console.log('action', action);
  switch (action.type) {
    case TABLE_RESIZE: {
      const field = action.data.type === 'col' ? 'colState' : 'rowState';
      const oldState = state[field] || {};
      const newState = {
        ...state,
        [field]: Object.assign(oldState, action.data),
      };
      return newState;
    }
    case INPUT_TEXT: {
      // console.log('INPUT_TEXT');
      const oldState = state.dataState || {};
      const newState = {
        ...state,
        currentText: action.data.currentText,
        dataState: Object.assign(oldState, action.data.dataState),
      };
      return newState;
    }
    default:
      return state;
  }
}
