import {ExcelComponent} from './ExcelComponent';

export class ExcelStoreComponent extends ExcelComponent {
  constructor(...args) {
    super(...args);
  }

  get template() {
    throw Error('shoul be realized in the instance of class');
  }

  initState(initialState = {}) {
    this.state = {...initialState};
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    this.$root.html(this.template);
    // return this.state;
  }
}
