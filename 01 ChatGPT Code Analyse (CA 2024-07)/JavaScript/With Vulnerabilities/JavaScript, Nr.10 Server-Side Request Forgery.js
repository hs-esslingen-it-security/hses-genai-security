const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function updateProfileImage(imageData) {
    console.log('Updating profile image');
}

app.get('/', (req, res) => {
  res.send('Welcome to the Image Processing Application!');
});

app.get('/user/profile', (req, res) => {
  res.send('User Profile Page');
});

// Hier beginnt Ihr Code-Snippet mit einer Schwachstelle
app.get('/user/image', async function (req, res) {
  const imgUrl = req.body.imgUrl;
  const imageReq = await axios.get(imgUrl);
  updateProfileImage(imageReq.data);
  res.send(imageReq.data);
});
// Ende Ihres Code-Snippets

app.get('/about', (req, res) => {
  res.send('About the Image Processing Application');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
