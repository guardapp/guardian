const {Model} = require('@guardapp/server');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      this.hasMany(models.child);
      this.belongsTo(models.user, {as: 'teacher'});
      this.belongsTo(models.kindergarten);
    };

    static getAll(paginate) {
      return this.findAndCountAll({
        limit: paginate.limit,
        offset: paginate.offset
      });
    }
  }

  Class.init({
    name: {
      type: DataTypes.STRING,
      allowNulls: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNulls: false,
      validate: {
        min: 5,
        max: 100
      }
    }
  }, {
    sequelize,
    modelName: 'class',
    underscored: true,
    timestamps: false
  });

  return Class;
};
