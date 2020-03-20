'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kindergarten = sequelize.define('kindergarten', {
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: false
  });
  Kindergarten.associate = function(models) {
    Kindergarten.hasMany(models.class);
    Kindergarten.belongsTo(models.user, {as: 'Principal'});
  };
  return Kindergarten;
};
