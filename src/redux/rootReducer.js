import {
  TABLE_RESIZE,
  INPUT_TEXT,
  APPLY_STYLE,
  GET_STYLES,
  CHANGE_TITLE,
} from './typesActions';

export function rootReducer(state, action) {
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
      const oldState = state.dataState || {};
      let addedDataState = {};
      if (action.data.dataState) {
        if (action.data.dataState.textContent === '') {
          delete oldState[action.data.dataState.id];
        } else {
          addedDataState = {
            [action.data.dataState.id]: action.data.dataState.textContent,
          };
        }
      }
      const newState = {
        ...state,
        currentText: action.data.currentText,
        dataState: Object.assign(oldState, addedDataState),
      };
      return newState;
    }
    case APPLY_STYLE: {
      // записываем в стейт текущие стили (нажали на тулбар)
      // A1: '', F4: '',
      // console.log('state ', state);
      // console.log('action.data.ids ', action.data.ids);
      const oldCurrentStyles = state.currentStyles || {};
      const newDataStyles = {};
      action.data.ids.forEach((id) => {
        newDataStyles[id] = {...state.dataStyles[id], ...action.data.value};
      });

      const newState = {
        ...state,
        currentStyles: Object.assign(oldCurrentStyles, action.data.value),
        dataStyles: {...state.dataStyles, ...newDataStyles},
      };
      console.log('newState ', newState);
      return newState;
    }
    case GET_STYLES: {
      const oldState = state.currentStyles || {};
      const newState = {
        ...state,
        currentStyles: Object.assign(oldState, action.data.currentStyles),
      };
      return newState;
    }
    case CHANGE_TITLE: {
      return {
        ...state,
        title: action.data,
      };
    }
    default:
      return state;
  }
}
