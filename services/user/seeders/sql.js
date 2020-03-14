module.exports = async sequelize => {
  return sequelize.transaction(async transaction => {
    // add roles
    const [Admin] = await sequelize.models.role.bulkCreate([
      {name: 'ADMIN'},
      {name: 'USER'}
    ], {transaction});
    // add user
    Admin.createUser({
      username: 'amirz',
      password: '1234'
    });
  });
}
;
