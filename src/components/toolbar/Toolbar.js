import {ExcelStoreComponent} from '../../core/ExcelStoreComponent.js';
import {createToolbar} from './toolbar.template.js';
import {$} from '../../core/dom.js';
import {defaultStyles} from '../../constants.js';
// import * as actions from '../../redux/actions';

export class Toolbar extends ExcelStoreComponent {
  static className = 'excel__toolbar';

  constructor(root, options) {
    super(root, {
      listeners: ['click'],
      subscribes: ['currentStyles'],
      name: 'Toolbar',
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    if (changes.currentStyles) {
      this.setState(changes.currentStyles);
    }
  }

  onClick(e) {
    const $target = $(e.target);
    if ($target.dataset.type === 'button') {
      const value = JSON.parse($target.dataset.value);
      const key = Object.keys(value)[0];
      const changedStyle = {[key]: value[key]};
      this.setState(changedStyle);
      this.$emit('toolbar:applyStyle', changedStyle);
    }
  }
}
