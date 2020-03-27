const crypto = require('crypto');
const {Model} = require('@guardapp/server');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.role, {through: 'user_roles'});
      this.hasMany(models.child, {as: 'Children', foreignKey: 'parent_id'});
      this.hasOne(models.kindergarten, {foreignKey: 'principal_id'});
      this.hasOne(models.class, {foreignKey: 'teacher_id'});
    };

    static get(id) {
      return this.findByPk(id, {
        include: [sequelize.models.role]
      });
    }

    static getAll(role, paginate) {
      const where = role ? {name: role} : null;
      return this.findAndCountAll({
        include: [{
          model: sequelize.models.role,
          where
        }],
        limit: paginate.limit,
        offset: paginate.offset
      });
    }
  }

  User.init({
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
  }, {
    sequelize,
    modelName: 'user',
    underscored: true
  });

  // User.associate = function(models) {
  //   User.belongsToMany(models.role, {through: 'user_roles'});
  //   User.hasMany(models.child, {as: 'Children', foreignKey: 'parent_id'});
  //   User.hasOne(models.kindergarten, {foreignKey: 'principal_id'});
  //   User.hasOne(models.class, {foreignKey: 'teacher_id'});
  // };
  return User;
};
