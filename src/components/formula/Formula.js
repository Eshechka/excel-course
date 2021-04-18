import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom.js';

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

    this.$on(
        'table:selectCell',
        (selectedCell) => {
          this.$formula.text(selectedCell.text());
        }
    );
    this.$on(
        'table:inputCell',
        (unputCell) => {
          this.$formula.text(unputCell.text());
        }
    );
  }

  onInput(e) {
    const text = $(e.target).text();
    this.$emit('formula:input', text);
  }
  onClick(e) {
    const $target = $(e.target);
    if ($target.dataset.id !== 'formula-input') {
      return;
    }
    this.$emit('formula:getfocus');
  }
  onKeydown(e) {
    const keys = ['Enter', 'Tab'];
    if (!keys.includes(e.code)) {
      return;
    }
    e.preventDefault();
    const $target = $(e.target);
    this.$emit('formula:lostfocus');

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
