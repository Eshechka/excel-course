import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor(root, options) {
    super(root, options.listeners || []);
    if (options.name) this.name = options.name;
  }

  toHTML() {
    return '';
  }

  init() {
    this.initEvents();
  }
  remove() {
    this.removeEvents();
  }
}
