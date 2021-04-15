import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor(root, options) {
    super(root, {
      name: 'Formula',
      listeners: ['input'],
      ...options,
    });
  }

  onInput(e) {
    const text = e.target.textContent;
    this.emitter.emit('formula:input', text);
  }

  toHTML() {
    return `
    
    <div class="info">fx</div>
    <div class="input" contenteditable spellcheck="false"></div>    
  `;
  }
}
