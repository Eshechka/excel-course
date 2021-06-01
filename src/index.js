import '../src/scss/index.scss';
import {Excel} from './components/excel/Excel';
import {Header} from './components/header/Header';
import {Toolbar} from './components/toolbar/Toolbar';
import {Formula} from './components/formula/Formula';
import {Table} from './components/table/Table';
import {storage, debounce} from './core/utils';
import {createStore} from './core/createStore';
import {rootReducer} from './redux/rootReducer';
import {initialState} from './redux/initialState';

const state = initialState;
const store = createStore(rootReducer, state);

const stateSubscribe = debounce((state) => {
  console.log('Change state');
  storage('excel-state', state);
}, 300);

store.subscribe(stateSubscribe);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
