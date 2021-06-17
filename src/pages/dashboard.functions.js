import {storage} from '../core/utils';

export function getTablesList() {
  const tableKeys = getKeys();
  if (!tableKeys.length) {
    return `<p>Ни одной таблицы Excel не создано</p>`;
  }
  return `
      <div class="db__list-header">
          <span>Название</span>
          <span>Дата открытия</span>
      </div>

      <ul class="db__list">
        ${tableKeys.map((key) => createTableRecord(key)).join('')}
       </ul>
       `;
}

function createTableRecord(key) {
  const tableKey = key.slice(6);
  const tableData = storage(key);
  return `
    <li class="db__record">
      <a href="#excel/${tableKey}">${tableData.title}</a>
      <strong>${new Date(tableData.lastOpened).toLocaleDateString()} 
              ${new Date(tableData.lastOpened).toLocaleTimeString()}</strong>
      </li>
      `;
  // <strong>${getDateFromTableKey(tableKey)}</strong>
}

function getKeys() {
  const tablesKeys = [];

  for (let i=0; i<localStorage.length; i++) {
    if (!localStorage.key(i).includes('excel')) {
      continue;
    }
    tablesKeys.push(localStorage.key(i));
  }
  return tablesKeys;
}
