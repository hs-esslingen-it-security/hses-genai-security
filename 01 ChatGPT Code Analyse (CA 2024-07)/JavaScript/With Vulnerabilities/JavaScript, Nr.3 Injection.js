const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`Received request for ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to our application!');
});

app.get('/customerOnboarding', (req, res) => {
  const name = req.query.name;
  const uppercaseName = eval('"' + name + '"' + '.toUpperCase()');
  res.send('Hi there, ' + uppercaseName);
});

app.get('/userInfo', (req, res) => {
  res.send('User information page');
});

app.use((req, res, next) => {
  res.status(404).send('Sorry, page not found!');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
