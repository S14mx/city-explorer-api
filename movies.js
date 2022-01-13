'use strict';

const axios = require('axios');

class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.avgVotes = movie.vote_average;
    this.totalVotes = movie.vote_count;
    this.image = movie.poster_path;
    this.popularity = movie.popularity;
    this.releaseDate = movie.release_date;
  }
}

const getMovies = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    const response = await axios.get(url);

    if (response) {
      const moviesArr = response.data.results.map(movie => new Movie(movie));
      res.status(200).send(moviesArr);
    }

  } catch (err) {
    res.send(err.response);
  }
};

module.exports = getMovies;
