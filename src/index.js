import '../src/scss/index.scss';
import {Excel} from './components/excel/Excel';
import {Header} from './components/header/Header';
import {Toolbar} from './components/toolbar/Toolbar';
import {Formula} from './components/formula/Formula';
import {Table} from './components/table/Table';
import {storage} from './components/table/table.functions';
import {createStore} from './core/createStore';
import {rootReducer} from './redux/rootReducer';
import {initialState} from './redux/initialState';

const state = initialState;
// const state = JSON.parse(localStorage.getItem('excel-state')) || {};
const store = createStore(rootReducer, state);

store.subscribe((state) => {
  storage('excel-state', state);
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
