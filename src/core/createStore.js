export function createStore(rootReducer, initialState) {
  let listeners = [];
  let state = rootReducer({...initialState}, {type: 'INIT'});

  return {
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => {
        listener(state);
      });
    },
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter((l) => l !== fn);
        },
      };
    },
    getState() {
      return state;
    },
  };
}
