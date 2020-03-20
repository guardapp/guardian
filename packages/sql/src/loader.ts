import {join} from 'path';
import {readdirSync} from 'fs';
import {Sequelize, Model} from 'sequelize/types';
import {seed} from './seeder';

export async function load(sequelize: Sequelize, modelPath: string, seedPath: string):
    Promise<Record<string, Model>> {
  const db = {};

  readdirSync(modelPath)
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
      })
      .forEach(file => {
        const model = sequelize['import'](join(modelPath, file));
        db[model.name] = model;
      });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  if (process.env.SEED === 'true') {
    await sequelize.sync({force: true});
    await seed(sequelize, seedPath);
  }

  return db;
}
