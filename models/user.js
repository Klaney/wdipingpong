'use strict';

var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasOne(models.player);
      },
      authenticate: function(email, password, callback){
      this.findOne({ where: {email:email } }).then(function(user){
        if (user){
          bcrypt.compare(password, user.password, function(err, result){
            if (err){
              callback(err, false);
            } else {
              callback(null, result ? user : false);
            }
          });
        } else {
          callback(null, false);
        }
      });
    }
  },
  hooks: {
      beforeCreate: function(user, options, callback){
        if (user.password) {
          bcrypt.hash(user.password, 10, function(err, hash){
            if (err){
              return callback(err);
            } else {
              user.password = hash;
              callback(null, user);
            }
          })
        }
      }
    }
  });
  return user;
};