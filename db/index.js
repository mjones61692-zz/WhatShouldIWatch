const mongoose = require('mongoose');
const promise = require('bluebird');
mongoose.Promise = promise;

mongoose.connect('mongodb://localhost:27017/movies', {useNewUrlParser: true});

let movieSchema = mongoose.Schema({
  title: String,
  imdbRank: String,
  rottenTomatoesRank: String,
  metacriticRank: String,
  imdbNum: Number,
  rottenTomatoesNum: Number,
  metacriticNum: Number,
  customNum: Number,
  rating: String,
  plot: String,
  awards: String,
  year: String,
  released: String,
  runtime: String,
  genre: String,
  director: String,
  writer: String,
  actors: String,
  poster: String,
  released: String,
  link: String
});

var Movie = mongoose.model('movie', movieSchema);

exports.save = function(movie) {
  let ratings = movie.Ratings.map((rating) => {
    return rating.Value;
  });
  let imdb = parseFloat(ratings[0].slice(0, 3)) * 10 || 0;
  let rotten = parseFloat(ratings[1].slice(0, 3).replace('%', '')) || 0;
  let meta = parseFloat(ratings[2].slice(0, 3).replace('/', '')) || 0;
  let customRank = (imdb + rotten + meta) / Math.min(3, ratings.length);
  let newMovie = new Movie({
    title: movie.Title || 'N/A',
    imdbRank: movie.Ratings[0].Value || 'N/A',
    rottenTomatoesRank: movie.Ratings[1].Value || 'N/A',
    metacriticRank: movie.Ratings[2].Value || 'N/A',
    imdbNum: imdb || 'N/A',
    rottenTomatoesNum: rotten || 'N/A',
    metacriticNum: meta || 'N/A',
    customNum: customRank,
    rating: movie.Rated || 'N/A',
    plot: movie.Plot || 'N/A',
    awards: movie.Awards || 'N/A',
    year: movie.Year,
    released: movie.Released,
    runtime: movie.Runtime,
    genre: movie.Genre,
    director: movie.Director,
    writer: movie.Writer,
    actors: movie.Actors,
    poster: movie.Poster,
    released: movie.Released,
    link: movie.imdbID
  });
  return newMovie.save().catch((err) => {
    if (err) {
      console.error(err);
    }
  });
};

exports.get = function (sort) {
  return Movie.find().sort('-' + sort).catch((err) => {
    if (err) {
      console.error(err);
    }
  });
};

exports.clear = function (sort) {
  return Movie.remove().catch((err) => {
    if (err) {
      console.error(err);
    }
  });
};