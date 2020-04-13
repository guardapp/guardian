const {ROLES} = require('../../lib/constants');

module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
      'role',
      {
        name: DataTypes.ENUM(...ROLES),
      },
      {
        underscored: true,
      }
  );
  role.associate = function(models) {
    role.belongsToMany(models.user, {through: 'user_roles'});
  };
  return role;
};
