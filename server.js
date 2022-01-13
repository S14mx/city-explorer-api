'use strict';

const express = require('express');
require('dotenv').config();
const getWeather = require('./weather');
const getMovies = require('./movies');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

app.get('/weather', getWeather);
app.get('/movies', getMovies);

app.listen(PORT, () => console.log(PORT));
