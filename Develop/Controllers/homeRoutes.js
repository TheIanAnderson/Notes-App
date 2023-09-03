const router = require("express").Router();
const path = require("path");
const express = require("express");
app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/", (req, res) => {
  res.render("notes");
});

module.exports = router;
