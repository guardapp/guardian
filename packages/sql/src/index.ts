import {Sequelize, Op, Model} from 'sequelize';
import {Logger} from '@guardapp/logger';
import {config} from '@guardapp/config';
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

export {Model, Op};

export class SQL {
  sequelize: Sequelize;

  constructor(private options: SqlOptions) {}

  get models() {
    return this.sequelize?.models;
  }

  async init() {
    if (this.models) return this.models;
    config();

    const {
      GUARD_SQL_HOST,
      GUARD_SQL_PORT,
      GUARD_SQL_DB,
      GUARD_SQL_USER,
      GUARD_SQL_PW
    } = process.env;

    this.sequelize = new Sequelize({
      host: GUARD_SQL_HOST,
      port: GUARD_SQL_PORT ? +GUARD_SQL_PORT : undefined,
      username: GUARD_SQL_USER,
      password: GUARD_SQL_PW,
      dialect: this.options.dialect || 'mysql',
      database: GUARD_SQL_DB,
      retry: {max: this.options.maxRetries || 2},
      logging: msg => logger.debug(msg)
    });

    const modelPath = this.options.modelPath || resolve(APP_ROOT_DIR, 'models', 'sql');
    const seedPath = this.options.seedPath || resolve(APP_ROOT_DIR, 'seeders', 'sql.js');
    return await load(this.sequelize, modelPath, seedPath);
  }
}
