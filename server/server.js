const path = require('path');
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

app.get('/api/cityInfo', (req, res) => {
  try {
    let { name } = req.query;

    const locationQuery = `https://www.metaweather.com/api/location/search/?query=${name}`;
    
    axios.get(locationQuery)
      .then(result => {
        console.log(result)
        const whereOnEarthID = result.data[0].woeid;
        const decriptionQuery = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${name}`
        const weatherQuery = `https://www.metaweather.com/api/location/${whereOnEarthID}/`

        axios.all([
          axios.get(decriptionQuery), 
          axios.get(weatherQuery)
        ])
        .then(axios.spread((data1, data2) => {
          let extract = Object.values(data1.data.query.pages)[0].extract
          extract = extract.substring(0, 500) + " ...";
          
          let weatherObj = data2.data.consolidated_weather[0]
          let simpleWeatherObj = {
            current: Math.round(weatherObj.the_temp),
            high: Math.round(weatherObj.max_temp),
            low: Math.round(weatherObj.min_temp)
          }
          
          res.send({ description: extract, weather: simpleWeatherObj });
        }));
      });
  } catch (error) {
    res.status(400).send('Error while getting data from API. Try again later.');
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});