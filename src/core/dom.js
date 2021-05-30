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

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  focus() {
    this.$el.focus();
  }
  unfocus() {
    this.$el.blur();
  }

  text(text) {
    if (text && typeof text === 'number') {
      text = text + '';
    }
    if (typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  addressCell() {
    const splitter = this.$el.dataset.id.indexOf(':');
    return {
      col: this.$el.dataset.id.slice(0, splitter),
      row: this.$el.dataset.id.slice(splitter+1),
    };
  }

  addClass(classname = '') {
    this.$el.classList.add(classname);
    return this;
  }
  removeClass(classname) {
    if (this.$el.classList.contains(classname)) {
      this.$el.classList.remove(classname);
    }
    return this;
  }

  get dataset() {
    return this.$el.dataset;
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this.$el;
    }
    return this.$el.getAttribute(name);
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
  getStyles(styles = []) {
    return styles.reduce((result, style) => {
      result[style] = this.$el.style[style];
      return result;
    }, {});
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
