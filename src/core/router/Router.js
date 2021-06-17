import {$} from '../dom';
import {ActiveRoute} from './ActiveRoute';

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
    this.placeholder.clear();

    const activeRoute = ActiveRoute.address;
    const paramsRoute = ActiveRoute.params;

    const Page = activeRoute.includes('excel') ?
      this.routes.excel :
      this.routes.dashboard;

    const page = new Page(paramsRoute);
    this.placeholder.append(page.getRoot());

    page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
