const {Op, Model, DataLoader} = require('@guardapp/server');

module.exports = (sequelize, DataTypes) => {
  class Child extends Model {
    static associate(models) {
      this.belongsTo(models.user, {as: 'parent'});
      this.belongsTo(models.class);
    };

    static get loaderByParent() {
      return loaderByParent;
    }

    static get loaderByClass() {
      return loaderByClass;
    }

    static get(id) {
      return this.findByPk(id);
    }

    static getByParent(parentId) {
      return this.findAll({
        include: [{
          model: sequelize.models.user,
          where: {id: parentId},
          as: 'parent'
        }]
      });
    }
  };

  const loaderByParent = new DataLoader(async (parentIds) => {
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

  const loaderByClass = new DataLoader(async (classIds) => {
    const children = await Child.findAll({
      include: [{
        model: sequelize.models.class,
        where: {id: {[Op.in]: classIds}}
      }]
    });
    return classIds.map(classId => children.filter(child => child.class.id == classId));
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
