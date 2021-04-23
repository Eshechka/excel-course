import '../src/scss/index.scss';
import {Excel} from './components/excel/Excel';
import {Header} from './components/header/Header';
import {Toolbar} from './components/toolbar/Toolbar';
import {Formula} from './components/formula/Formula';
import {Table} from './components/table/Table';
import {storage} from './components/table/table.functions';
import {createStore} from './core/createStore';
import {rootReducer} from './redux/rootReducer';

const store = createStore(rootReducer, {
  colState: {},
});

store.subscribe((state) => {
  console.log('state', state);
  storage('resize-data', JSON.stringify(state));
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
