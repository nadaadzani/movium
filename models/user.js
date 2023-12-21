'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Movie)
    }
  }
  User.init({
    username: { type: DataTypes.STRING, allowNull: false,
      validate: {
        notNull: { msg: `Username can't be null`},
        notEmpty: { msg: `Username can't be empty`}
      }},
    password: {type: DataTypes.STRING, allowNull: false,
      validate: {
        notNull: { msg: `Password can't be null`},
        notEmpty: { msg: `Password can't be empty`}
      }},
    role: {type: DataTypes.STRING, allowNull: false,
      validate: {
        notNull: { msg: `Role can't be null`},
        notEmpty: { msg: `Role can't be empty`}
      }}
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(User, options) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(User.password, salt);

        User.password = hash
      }
    }
  });
  return User;
};