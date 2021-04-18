import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options.listeners || []);
    this.name = options.name || '';
    this.emitter = options.emitter || {};
    this.unsubs = [];
  }

  toHTML() {
    return '';
  }

  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }
  $on(eventName, cb) {
    const unsub = this.emitter.subscribe(eventName, cb);
    this.unsubs.push(unsub);
  }

  init() {
    this.initEvents();
  }
  remove() {
    this.removeEvents();
    this.unsubs.forEach((unsub) => {
      unsub();
    });
  }
}
