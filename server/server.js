const path = require('path');
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

app.get('/api/city', (req, res) => {
  try {
    let { name, labels = [] } = req.query;

    const decriptionQuery = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${name}`
    const result = axios.get(decriptionQuery)
                    .then(result => {
                      // console.log(Object.values(result.data.query.pages)[0].extract)
                      let extract = Object.values(result.data.query.pages)[0].extract
                      extract = extract.substring(0, 500) + " ..."
                      res.send({ description: extract, currentWeather: "1°C" });
                    });
    
    // axios.all([
    //   axios.get(decriptionQuery), 
    //   axios.post(weatherQuery)
    // ])
    // .then(axios.spread((data1, data2) => {
    //   // output of req.
    //   let extract = Object.values(data1.data.query.pages)[0].extract
    //   extract = extract.substring(0, 500) + " ...";
      
    //   console.log(extract)
      
    //   res.send({ description: extract, currentWeather: "1°C" });
    // }));
    
  } catch (error) {
    res.status(400).send('Error while getting data from API. Try again later.');
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});