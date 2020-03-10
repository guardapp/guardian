'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNulls: false,
      validate: {
        min: 0,
        max: 20,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNulls: false,
      set(value) {
        this.setDataValue('password', '!' + value);
      }
    }
  }, {underscored: true});
  User.associate = function(models) {
    User.belongsToMany(models.role, {through: 'user_roles'});
  };
  return User;
};
