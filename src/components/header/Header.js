import {ExcelComponent} from '../../core/ExcelComponent';
import {defaultTitle} from '../../constants.js';
import {$} from '../../core/dom.js';
import * as actions from '../../redux/actions.js';
import {ActiveRoute} from '../../core/router/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor(root, options) {
    super(root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
    <input type="text" class="input" value="${title}" />
      <div>

        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>

        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>

      </div>`;
  }

  onInput(e) {
    const $target = $(e.target);
    this.$dispatch(actions.changeTitle($target.text()));
  }

  onClick(e) {
    const $target = $(e.target);
    if (!$target.dataset.button) {
      return;
    } else if ($target.dataset.button === 'exit') {
      window.location.hash = '#';
    } else if ($target.dataset.button === 'remove') {
      const tableID = ActiveRoute.params;
      localStorage.removeItem(`excel:${tableID}`);
      ActiveRoute.navigate('#');
    }
  }
}
