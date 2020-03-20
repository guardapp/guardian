'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    name: DataTypes.ENUM('ADMIN', 'PARENT', 'PRINCIPAL', 'TEACHER')
  }, {
    underscored: true,
  });
  role.associate = function(models) {
    role.belongsToMany(models.user, {through: 'user_roles'});
  };
  return role;
};
