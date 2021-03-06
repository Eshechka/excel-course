export class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false;
    }
    this.listeners[eventName].forEach((listener) => {
      listener(...args);
    });
  }

  subscribe(eventName, cb) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(cb);
    return () => {
      this.listeners[eventName] = this.listeners[eventName].filter(
          (listener) => listener !== cb
      );
    };
  }
}
