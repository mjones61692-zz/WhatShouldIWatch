const axios = require('axios');
const APIKey = require('../config.js');

exports.getMovieData = function(movie) {
  return axios.get(`http://www.omdbapi.com/?apikey=${APIKey}&t=${movie}&plot=full`);
};