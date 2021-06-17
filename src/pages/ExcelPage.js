import {Excel} from '../components/excel/Excel';
import {Formula} from '../components/formula/Formula';
import {Header} from '../components/header/Header';
import {Table} from '../components/table/Table';
import {Toolbar} from '../components/toolbar/Toolbar';
import {createStore} from '../core/createStore';
import {Page} from '../core/router/Page';
import {debounce, storage} from '../core/utils';
import {initialState} from '../redux/initialState';
import {rootReducer} from '../redux/rootReducer';

export class ExcelPage extends Page {
  getRoot() {
    if (!this.params) {
      this.params = Date.now().toString();
      window.location.hash = `#excel/${this.params}`;
    }
    const stateKey = `excel:${this.params}`;
    const store = createStore(rootReducer, initialState(stateKey));

    const stateSubscribe = debounce((state) => {
      storage(`excel:${this.params}`, state);
    }, 300);

    store.subscribe(stateSubscribe);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
