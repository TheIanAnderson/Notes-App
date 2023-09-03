const path = require("path");
const express = require("express");
const app = express();
const routes = require("./Controllers");
// const sequelize = require("./config/connection");
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/api/notes.html"));
});

app.use(routes);

app.listen(PORT, () => {
  console.log("Now listening to localhost 3001");
});
