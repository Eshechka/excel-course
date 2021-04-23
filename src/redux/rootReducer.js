import {TABLE_RESIZE} from './typesActions';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const oldState = state.colState;
      const newState = {
        ...state,
        colState: Object.assign(oldState, action.data),
      };
      return newState;
    }
    default:
      return state;
  }
}
