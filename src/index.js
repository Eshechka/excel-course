import '../src/scss/index.scss';
import {Router} from './core/router/Router';
import {DashboardPage} from './pages/DasboardPage';
import {ExcelPage} from './pages/ExcelPage';

const router = new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
console.log(router.hashAddress);
