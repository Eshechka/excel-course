import {ExcelComponent} from '../../core/ExcelComponent';
import {defaultTitle} from '../../constants.js';
import {$} from '../../core/dom.js';
import * as actions from '../../redux/actions.js';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor(root, options) {
    super(root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
    <input type="text" class="input" value="${title}" />
      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>`;
  }

  onInput(e) {
    const $target = $(e.target);
    this.$dispatch(actions.changeTitle($target.text()));
  }
}
