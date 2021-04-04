export class DomListener {
  constructor(root, listeners) {
    if (!root) {
      throw new Error('not root provided for DomListener');
    }
    this.$root = root;// instance of dom class
    this.$listeners = listeners;
  }

  initEvents() {
    this.$listeners.forEach((eventName) => {
      const methodName = 'on' + capitalize(eventName);
      this[methodName] = this[methodName].bind(this);
      this.$root.on(eventName, this[methodName]);
    });
  }
  removeEvents() {
    this.$listeners.forEach((eventName) => {
      const methodName = 'on' + capitalize(eventName);
      this.$root.off(eventName, this[methodName]);
    });
  }
}

function capitalize(text) {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}
