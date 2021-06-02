import {Excel} from '../components/excel/Excel';
import {Formula} from '../components/formula/Formula';
import {Header} from '../components/header/Header';
import {Table} from '../components/table/Table';
import {Toolbar} from '../components/toolbar/Toolbar';
import {createStore} from '../core/createStore';
import {debounce, storage} from '../core/utils';
import {initialState} from '../redux/initialState';
import {rootReducer} from '../redux/rootReducer';

export class ExcelPage {
  getRoot() {
    const state = initialState;
    const store = createStore(rootReducer, state);

    const stateSubscribe = debounce((state) => {
      console.log('Change state');
      storage('excel-state', state);
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
}
