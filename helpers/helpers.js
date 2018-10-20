const axios = require('axios');
const APIKey = process.env.API || require('../config.js').API_KEY;

exports.getMovieData = function(movie) {
  return axios.get(`http://www.omdbapi.com/?apikey=${APIKey}&t=${movie}&plot=full`);
};