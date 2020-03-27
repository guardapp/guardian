const {Model, Op, DataLoader} = require('@guardapp/server');
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

    static get(id) {
      return this.findByPk(id);
    }

    static get classLoader() {
      return classLoader;
    }
  }

  const classLoader = new DataLoader(async kindergartenIds => {
    const classes = Class.findAll({
      include: [{
        model: sequelize.models.kindergarten,
        where: {id: {[Op.in]: kindergartenIds}}
      }]
    });
    return kindergartenIds.map(id => classes.filter(c => c.kindergarten.id == id));
  });

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
