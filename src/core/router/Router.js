import {$} from '../dom';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw Error('Selector not provided for Router');
    }

    this.placeholder = $(selector);
    this.routes = routes;
    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  get hashAddress() {
    return window.location.hash.slice(1);
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    // const Page = this.routes.dashboard;
    const Page = this.routes.excel;
    const page = new Page;
    this.placeholder.append(page.getRoot());

    page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
