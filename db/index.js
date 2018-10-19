const mongoose = require('mongoose');
const promise = require('bluebird');
mongoose.Promise = promise;

mongoose.connect('mongodb://localhost:27017/movies', {useNewUrlParser: true});

let movieSchema = mongoose.Schema({
  title: String,
  imdbRank: String,
  rottenTomatoesRank: String,
  metacriticRank: String,
  rating: String,
  plot: String,
  awards: String
});

var Movie = mongoose.model('movie', movieSchema);

exports.save = function(movie) {
  let newMovie = new Movie({
    title: movie.Title || 'N/A',
    imdbRank: movie.Ratings[0].value || 'N/A',
    rottenTomatoesRank: movie.Ratings[1].value || 'N/A',
    metacriticRank: movie.Ratings[2].value || 'N/A',
    rating: movie.Rated || 'N/A',
    plot: movie.Plot || 'N/A',
    awards: movie.Awards || 'N/A'
  });
  return newMovie.save().catch((err) => {
    if (err) {
      console.error(err);
    }
  });
};

exports.get = function () {
  return Movie.find().catch((err) => {
    if (err) {
      console.error(err);
    }
  });
};