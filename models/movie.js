'use strict';
const {
  Model, Op
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

    static async searchByName(Genre, MovieGenre, search = "") {
      
      let option = {
        include: [{ model: Genre, through: MovieGenre }],
        where: {
          movieName: { [Op.iLike]: `%${search}%`}
        },
        order: [['movieName', 'asc']]
      }
      console.log(option)
      let result = await Movie.findAll(option)
      return result
    }

    get realMovieRating() {
      return `${this.movieRating} / 10`
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