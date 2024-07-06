const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/generate-image', async (req, res) => {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: { query: req.query.query },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching image');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
