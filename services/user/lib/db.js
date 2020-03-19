const {SQL} = require('@guardapp/sql');
const {init} = require('@guardapp/config');

let sql = null;

(async () => {
  await init();
  sql = new SQL({maxRetries: 3});
  await sql.init();
})();

module.exports = async () => {
  if (sql) return Promise.resolve(sql);

  await init();
  sql = new SQL({maxRetries: 3});
  await sql.init();
  return sql;
};
