'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User)
      Movie.belongsToMany(models.Genre, { through: models.MovieGenre, foreignKey: 'MovieId'})
    }
  }
  Movie.init({
    movieName: DataTypes.STRING,
    movieDescription: DataTypes.TEXT,
    movieRating: DataTypes.INTEGER,
    movieImg: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};