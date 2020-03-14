import {Sequelize} from 'sequelize/types';

export function seed(sequelize: Sequelize, seedPath: string): Promise<void> {
  const seedModule = require(seedPath);
  return seedModule(sequelize);
}
