const express = require("express");
const bodyParser = require("body-parser");
const libxml = require("libxmljs");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the application!");
});

function addToFavorites(favorite) {
  console.log("Added to favorites:", favorite.toString());
}

app.post("/profile/favorites", (req, res) => {
  let favorite = libxml.parseXml(req.body, { noent: true });
  addToFavorites(favorite);
  res.send("Favorite added successfully.");
});

app.get("/status", (req, res) => {
  res.send("Application is running.");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
