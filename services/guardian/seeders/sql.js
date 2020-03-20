module.exports = async sequelize => {
  return sequelize.transaction(async transaction => {
    // add roles
    const [Admin, PARENT, PRINCIPAL, TEACHER] = await sequelize.models.role.bulkCreate([
      {name: 'ADMIN'},
      {name: 'PARENT'},
      {name: 'PRINCIPAL'},
      {name: 'TEACHER'}
    ], {transaction});
    // add user
    await Admin.createUser({
      email: 'amirz@guardapp.com',
      password: '1234'
    }, {transaction});

    const p = await PARENT.createUser({
      email: 'parent@guardapp.com',
      password: '1234'
    }, {transaction});

    const t = await TEACHER.createUser({
      email: 'teacher@guardapp.com',
      password: '1234'
    }, {transaction});

    const pl = await PRINCIPAL.createUser({
      email: 'principal@guardapp.com',
      password: '1234'
    }, {transaction});

    const child = await p.createChild({
      name: 'adam',
      profile: '1',
      age: 2.4
    }, {transaction});

    const c = await child.createClass({
      name: 'middle class',
      capacity: 20
    }, {transaction});

    const k = await c.createKindergarten({
      name: 'Vitzo',
      city: 'Ganey Tikva',
      adddress: 'hamz 7',
      country: 'israel'
    }, {transaction});

    c.setTeacher(t);
    k.setPrincipal(pl);
  });
}
;
