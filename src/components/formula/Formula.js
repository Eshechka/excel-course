import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom.js';
// import * as actions from '../../redux/actions.js';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor(root, options) {
    super(root, {
      name: 'Formula',
      listeners: ['input', 'keydown', 'click'],
      ...options,
    });
  }

  init() {
    super.init();

    this.$formula = this.$root.find('[data-id="formula-input"]');

    this.$subscribe((state) => {
      this.$formula.text(state.currentText);
    });
  }

  onInput(e) {
    const text = $(e.target).text();
    this.$emit('formula:input', text);
    // this.$dispatch(actions.inputText({
    //   currentText: $(e.target).text(),
    //   dataState: {
    //     [this.selection.currentCell.dataset.id]: $(e.target).text(),
    //   },
    // }));
  }
  onClick(e) {
    const $target = $(e.target);
    if ($target.dataset.id !== 'formula-input') {
      return;
    }
    // this.$emit('formula:getfocus');

    // this.$dispatch({type: 'formula click'});
  }
  onKeydown(e) {
    const keys = ['Enter', 'Tab'];
    if (!keys.includes(e.code)) {
      return;
    }
    e.preventDefault();
    const $target = $(e.target);
    // this.$emit('formula:lostfocus');

    $target.unfocus();
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div class="input" contenteditable 
      spellcheck="false"
      data-id="formula-input"
    ></div>    
  `;
  }
}
