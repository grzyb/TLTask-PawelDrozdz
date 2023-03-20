// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const commonConfig = {
  migrationStorageTableName: 'sequelize_meta',
  seederStorageTableName: 'sequelize_data',
  dialect: 'sqlite',
  storage: './database.sqlite3',
};

module.exports = {
  local: {
    ...commonConfig,
  },
  development: {
    ...commonConfig,
  },
  test: {
    ...commonConfig,
    storage: ':memory',
  },
  production: {
    ...commonConfig,
  },
};
