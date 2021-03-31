class Dom {
  constructor(selector) {
    if (typeof selector === 'string') {
      this.$el = document.querySelector(selector);
    } else {
      this.$el = selector;
    }
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
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

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  styles(styleObject) {
    for (const key in styleObject) {
      if (Object.prototype.hasOwnProperty.call(styleObject, key)) {
        this.$el.style[key] = styleObject[key];
      }
    }
  }

  findAll(selector) {
    const nodes = Array.from(this.$el.querySelectorAll(selector));
    return nodes.map((noda) => $(noda));
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
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

