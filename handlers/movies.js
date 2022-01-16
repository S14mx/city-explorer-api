'use strict';

const axios = require('axios');
const Movie = require('../classes/Movie.js');
const cache = require('../data/cache.js');

const getMovies = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    console.log('line 11', cache);

    if (cache[`${searchQuery}Movies`] && (Date.now() - cache[`${searchQuery}Movies`].timeStamp) < (1000 * 60 * 60 * 24 * 3)) {
      console.log('cache hit');
      // console.log('movies array line 16', cache[`${searchQuery}Movies`].movieData);
      res.send(cache[`${searchQuery}Movies`].movieData);
    } else {
      const response = await axios.get(url);
      if (response) {
        const moviesArr = response.data.results.map(movie => new Movie(movie));
        console.log('cache miss');
        cache[`${searchQuery}Movies`] = {
          movieData: moviesArr,
          timeStamp: Date.now()
        };
        console.log('line 28', cache);
        res.status(200).send(moviesArr);
      }
    }
  } catch (err) {
    res.send(err.response);
  }
};

module.exports = getMovies;
