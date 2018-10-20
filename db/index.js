const mongoose = require('mongoose');
const promise = require('bluebird');
mongoose.Promise = promise;

let mongouri = process.env.MONGO || require('../config.js').MONGO;

mongoose.connect(mongouri, {useNewUrlParser: true});

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
  link: String,
  user: String
});

let userSchema = mongoose.Schema({
  user: String,
  password: String
});

var Movie = mongoose.model('movie', movieSchema);
var User = mongoose.model('user', userSchema);

exports.save = function(movie, user) {
  let imdb = null;
  let meta = null;
  let rotten = null;
  let ratings = movie.Ratings.map((rating) => {
    return rating.Value;
  });
  if (ratings[0]) {
    imdb = parseFloat(ratings[0].slice(0, 3)) * 10 || 0;
  }
  if (ratings[1]) {
    rotten = parseFloat(ratings[1].slice(0, 3).replace('%', '')) || 0;
  }
  if (ratings[2]) {
    meta = parseFloat(ratings[2].slice(0, 3).replace('/', '')) || 0;
  }
  let customRank = (imdb + rotten + meta) / Math.min(3, ratings.length);
  return Movie.findOneAndUpdate(
    {title: movie.Title, user: user},
    {
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
      link: movie.imdbID,
      user: user
    },
    {upsert: true}
  ).exec()
};

exports.get = function(sort, user) {
  return Movie.find({user: user}).sort('-' + sort).catch((err) => {
    if (err) {
      console.error(err);
    }
  });
};

exports.saveUser = function(user, password) {
  let newUser = new User({
    user: user,
    password: password
  })
  return newUser.save();
}

exports.findUser = function(user) {
  return User.find({user: user}).catch((err) => {
    if (err) {
      console.error(err);
    }
  });
}

exports.clear = function(user) {
  return Movie.deleteMany({user: user}).catch((err) => {
    if (err) {
      console.error(err);
    }
  });
};

exports.connection = mongoose.connection;