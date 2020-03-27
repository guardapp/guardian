const {Model, Op, DataLoader} = require('@guardapp/server');

module.exports = (sequelize, DataTypes) => {
  class Kindergarten extends Model {
    static associate(models) {
      this.hasMany(models.class);
      this.belongsTo(models.user, {as: 'principal'});
    }

    static get kindergartenLoader() {
      return kindergartenLoader;
    }

    static getAll({limit, offset}) {
      return this.findAndCountAll({
        limit,
        offset
      });
    }

    static get(id) {
      return this.findByPk(id);
    }
  }

  const kindergartenLoader = new DataLoader(async classIds => {
    const classes = await sequelize.models.class.findAll({
      include: [sequelize.models.kindergarten],
      where: {id: {[Op.in]: classIds}}
    });
    return classIds.map(classId => classes.find(c => c.id == classId).kindergarten);
  });

  Kindergarten.init({
    name: {
      type: DataTypes.STRING,
      allowNulls: false
    },
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kindergarten',
    underscored: true,
    timestamps: false
  });
  return Kindergarten;
};
