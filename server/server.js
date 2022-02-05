const path = require('path');
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

app.get('/api/city', async (req, res) => {
  try {
    let { name, labels = [] } = req.query;
    // const query = `https://${name}`;
    // const result = await axios.get(query);
    res.send({ description: `Hello ${name}!`, currentWeather: "1°C" });
  } catch (error) {
    res.status(400).send('Error while getting data from API. Try again later.');
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});