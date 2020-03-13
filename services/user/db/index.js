'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize} = require('sequelize');
const seeder = require('./seed');

module.exports = async logger => {
  const basename = path.basename(__filename);
  const modelPath = path.resolve(__dirname, 'models');
  const dbLogger = logger.extend('db');
  const sequelize = new Sequelize('public', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: 'mysql',
    retry: {max: 3},
    logging: msg => dbLogger.debug(msg)
  });

  const db = {};

  fs
      .readdirSync(modelPath)
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
      })
      .forEach(file => {
        const model = sequelize['import'](path.join(modelPath, file));
        db[model.name] = model;
      });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  /* TODO: NEED TO CHANGE IN PRODUCTION  */
  await sequelize.sync({force: true});

  /* TODO: NEED TO CHANGE IN PRODUCTION  */
  await seeder(sequelize);

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
};
