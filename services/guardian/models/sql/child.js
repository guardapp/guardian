const {Op, Model, DataLoader} = require('@guardapp/server');

module.exports = (sequelize, DataTypes) => {
  class Child extends Model {
    static associate(models) {
      this.belongsTo(models.user, {as: 'parent'});
      this.belongsTo(models.class);
    };

    static get loader() {
      return loader;
    }
  };

  const loader = new DataLoader(async (parentIds) => {
    const children = await Child.findAll({
      include: [{
        model: sequelize.models.user,
        as: 'parent',
        where: {
          id: {
            [Op.in]: parentIds
          }
        }
      }]
    });
    return parentIds.map(id => children.filter(child => child.parent.id == id));
  });

  Child.init({
    name: {
      type: DataTypes.STRING,
      allowNulls: false
    },
    profile: DataTypes.STRING,
    age: {
      type: DataTypes.FLOAT(3, 1),
      allowNulls: false,
      validate: {
        min: 0,
        max: 20
      }
    }
  }, {sequelize, modelName: 'child', underscored: true, timestamps: false});

  return Child;
};
