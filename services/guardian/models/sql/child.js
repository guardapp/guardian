module.exports = (sequelize, DataTypes) => {
  const Child = sequelize.define('child', {
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
  }, {underscored: true, timestamps: false});
  Child.associate = function(models) {
    Child.belongsTo(models.user, {as: 'Parent'});
    Child.belongsTo(models.class);
  };
  return Child;
};
