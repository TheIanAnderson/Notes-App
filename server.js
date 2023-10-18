//Imports Node packages 
const express = require("express");
const path = require("path");

//Imports router
const api = require('./routes/index')

//Initialize Express and the PORT the server will run
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static assets from public folder
app.use(express.static("public"));

//GET routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

//Sends api requests to index.js in routes folder
app.use('/api',api)

app.listen(PORT, () => {
  console.log(`application succesfully listening to http://localhost:${PORT}`);
});
