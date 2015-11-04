'use strict';
module.exports = function(sequelize, DataTypes) {
  var player = sequelize.define('player', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    nickname: DataTypes.STRING,
    style: DataTypes.STRING,
    handgrip: DataTypes.STRING,
    biography: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.player.hasMany(models.comments);
        models.player.belongsTo(models.user);
      }
    }
  });
  return player;
};