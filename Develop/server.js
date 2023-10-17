const path = require("path");
const express = require("express");
const app = express();
const routes = require("./Controllers");
const bodyParser = require("body-parser");
const fs = require("fs/promises"); // const sequelize = require("./config/connection");
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/api/notes.html"));
});

app.post("/api/notes.html", (req, res) => {
  const noteData = req.body;
  const newNote = { id: 1, ...noteData };
  res.status(201).json(newNote);
});

// Get all notes from db/db.json
app.get("/api/notes", async (req, res) => {
  try {
    const data = await fs.readFile("db/db.json", "utf8");
    const notes = JSON.parse(data);
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

function generateUniqueId(notes) {
  // Find the highest existing ID and add 1
  const maxId = notes.reduce((max, note) => (note.id > max ? note.id : max), 0);
  return maxId + 1;
}

// Create a new note and save it to db/db.json
app.post("/api/notes", async (req, res) => {
  try {
    const data = await fs.readFile("db/db.json", "utf8");
    const notes = JSON.parse(data);

    const newNote = req.body;
    // Generate a unique ID for the new note, save it, and update db/db.json
    newNote.id = generateUniqueId(notes);
    notes.push(newNote);

    await fs.writeFile("db/db.json", JSON.stringify(notes, null, 2), "utf8");
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// app.use(routes);

app.listen(PORT, () => {
  console.log("Now listening to localhost 3001");
});
