const faker = require('faker');
const {ROLES} = require('../lib/constants');

const USERS_COUNT = 100;
const KINDERGARTENS_COUNT = 50;
const CLASSES_COUNT = KINDERGARTENS_COUNT * 3;
const CHILDREN_COUNT = CLASSES_COUNT * 10;

module.exports = async (sequelize) => {
  let roles = null;
  let users = null;
  let children = null;
  let kindergartens = null;
  let classes = null;
  await sequelize.transaction(async (transaction) => {
    // add roles
    const roleNames = ROLES.map((role) => ({name: role}));
    roles = await sequelize.models.role.bulkCreate(roleNames, {transaction});

    // add users
    const fakeUsers = new Array(USERS_COUNT).fill(0).map(() => ({
      email: faker.internet.email(),
      password: '1234',
    }));
    users = await sequelize.models.user.bulkCreate(fakeUsers, {transaction});

    // add children
    const childrenModels = new Array(CHILDREN_COUNT).fill(0).map(() => ({
      name: faker.name.firstName(),
      profile: faker.internet.avatar(),
      age: faker.random.number({min: 1, max: 5, precision: 2}),
    }));
    children = await sequelize.models.child.bulkCreate(childrenModels, {transaction});

    // add kindergarten
    const kindergartensModel = new Array(KINDERGARTENS_COUNT).fill(0).map(() => ({
      name: faker.company.companyName(),
      city: faker.address.city(),
      address: faker.address.streetAddress(),
      country: faker.address.country(),
    }));
    kindergartens = await sequelize.models.kindergarten.bulkCreate(kindergartensModel, {
      transaction,
    });

    // add classes
    const classModels = new Array(CLASSES_COUNT).fill(0).map(() => ({
      name: faker.company.catchPhrase(),
      capacity: 20,
    }));
    classes = await sequelize.models.class.bulkCreate(classModels, {transaction});
  });

  const principals = [];
  const parents = [];
  const teachers = [];
  for (const user of users) {
    const index = faker.random.number({min: 0, max: 3});
    const role = roles[index];
    user.addRole(role);
    if (role.name === 'PRINCIPAL') principals.push(user);
    if (role.name === 'PARENT') parents.push(user);
    if (role.name === 'TEACHER') teachers.push(user);
  }

  for (const c of children) {
    const indexP = faker.random.number({min: 0, max: parents.length - 1});
    const indexC = faker.random.number({min: 0, max: classes.length - 1});
    c.setParent(parents[indexP]);
    c.setClass(classes[indexC]);
  }

  for (const k of kindergartens) {
    const index = faker.random.number({min: 0, max: principals.length - 1});
    k.setPrincipal(principals[index]);
  }

  for (const c of classes) {
    const indexC = faker.random.number({min: 0, max: kindergartens.length - 1});
    const indexT = faker.random.number({min: 0, max: teachers.length - 1});
    c.setKindergarten(kindergartens[indexC]);
    c.setTeacher(teachers[indexT]);
  }
};
