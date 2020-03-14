import {Sequelize, Model} from 'sequelize';
import {Logger} from '@guardapp/logger';
import {init} from '@guardapp/config';
import {load} from './loader';

import {dirname, resolve} from 'path';

const APP_ROOT_DIR = dirname(require.main.filename);
const logger = new Logger('@guardapp/sql');

export interface SqlOptions {
    dialect?: 'mysql' | 'mariadb' | 'postgres' | 'mssql';
    maxRetries?: number;
    modelPath?: string;
    seedPath?: string;
}

export {Model};

export async function sql(options: SqlOptions) {
  const {
    dialect = 'mysql',
    maxRetries = 2,
    modelPath = resolve(APP_ROOT_DIR, 'models', 'sql'),
    seedPath = resolve(APP_ROOT_DIR, 'seeders', 'sql.js')
  } = options;

  const config = await init();

  const {
    GUARD_SQL_HOST,
    GUARD_SQL_PORT,
    GUARD_SQL_DB,
    GUARD_SQL_USER,
    GUARD_SQL_PW
  } = config;

  const sequelize = new Sequelize({
    host: GUARD_SQL_HOST,
    port: GUARD_SQL_PORT ? +GUARD_SQL_PORT : undefined,
    username: GUARD_SQL_USER,
    password: GUARD_SQL_PW,
    dialect,
    database: GUARD_SQL_DB,
    retry: {max: maxRetries},
    logging: msg => logger.debug(msg)
  });

  return await load(sequelize, modelPath, seedPath);
}
