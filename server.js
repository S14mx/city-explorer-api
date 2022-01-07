'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.desc = day.weather.description;
  }
}

const truncate = (fullString) => {
  const dotIndex = fullString.indexOf('.');
  return dotIndex ? fullString.slice(0, dotIndex + 3) : fullString;
};

app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;

  if (!lat || !lon || !searchQuery) {
    res.status(400).send('bad request');
  }

  const result = weatherData.find(obj => truncate(obj.lat) === truncate(lat) && truncate(obj.lon) === truncate(lon));
  console.log(result);
  if (result) {
    const weatherArr = result.data.map(day => new Forecast(day));
    res.status(200).send(weatherArr);

  } else {

    res.status(503).send('city not found');
  }
});


app.listen(PORT, () => console.log(PORT));
