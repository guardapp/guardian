const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNulls: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNulls: false,
      set(value) {
        // create salt
        const buf = crypto.randomBytes(16);
        const salt = buf.toString('hex');
        this.setDataValue('salt', salt);
        // hash password with salt
        const hash = crypto.createHash('sha256');
        hash.update(salt + value);
        this.setDataValue('password', hash.digest('hex'));
      }
    },
    salt: {
      type: DataTypes.STRING,
      allowNulls: false,
      set(value) {
        throw new Error('readonly value');
      }
    }
  }, {underscored: true});
  User.associate = function(models) {
    User.belongsToMany(models.role, {through: 'user_roles'});
    User.hasMany(models.child, {as: 'Children', foreignKey: 'parent_id'});
    User.hasOne(models.kindergarten, {foreignKey: 'principal_id'});
    User.hasOne(models.class, {foreignKey: 'teacher_id'});
  };
  return User;
};
