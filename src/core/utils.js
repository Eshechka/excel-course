export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
  if (typeof(a) === 'object' && typeof(b) === 'object') {
    return (JSON.stringify(a) === JSON.stringify(b));
  }
  return a === b;
}

export function camelToDash(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function debounce(fn, wait) {
  let timeout;
  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function parse(value) {
  if (value && value.startsWith('=')) {
    try {
      return eval(value.slice(1));
    } catch (e) {
      console.warn('skip for correct working eval function');
      return value.slice(1);
    }
  }
  return value;
}
