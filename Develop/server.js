const path = require("path");
const express = require("express");
const app = express();
const routes = require("./Controllers");
// const sequelize = require("./config/connection");
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.listen(PORT, () => {
  console.log("Now listening to localhost 3001");
});
