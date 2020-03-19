const crypto = require('crypto');
const hash = crypto.createHash('sha256');


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
        // create salt
        const buf = crypto.randomBytes(16);
        const salt = buf.toString('hex');
        this.setDataValue('salt', salt);
        // hash password with salt
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
  };
  return User;
};
