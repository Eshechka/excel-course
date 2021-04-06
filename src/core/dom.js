class Dom {
  constructor(selector) {
    if (typeof selector === 'string') {
      this.$el = document.querySelector(selector);
    } else {
      this.$el = selector;
    }
  }

  getDimensions() {
    return this.$el.getBoundingClientRect();
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  closest(selector) {
    return this.$el.closest(selector);
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  get dataset() {
    return this.$el.dataset;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  on(eventName, cb) {
    this.$el.addEventListener(eventName, cb);
  }
  off(eventName, cb) {
    this.$el.removeEventListener(eventName, cb);
  }
  style(stylesObject = {}) {
    for (const key in stylesObject) {
      if ({}.hasOwnProperty.call(stylesObject, key)) {
        this.$el.style[key] = stylesObject[key];
      }
    }
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  el.classList.add(classes);
  return $(el);
};
