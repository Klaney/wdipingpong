'use strict';
module.exports = function(sequelize, DataTypes) {
  var player = sequelize.define('player', {
    userId: DataTypes.INTEGER,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    nickname: DataTypes.STRING,
    style: DataTypes.STRING,
    handgrip: DataTypes.STRING,
    biography: DataTypes.TEXT,
    imgkey: DataTypes.STRING,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER
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