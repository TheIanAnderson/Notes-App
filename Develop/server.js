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

// Create a new note and save it to db/db.json
app.post("/api/notes", async (req, res) => {
  try {
    const data = await fs.readFile("db/db.json", "utf8");
    const notes = JSON.parse(data);

    const newNote = req.body;
    // Generate a unique ID for the new note, save it, and update db/db.json
    newNote.id = generateUniqueId();
    notes.push(newNote);

    await fs.writeFile("db/db.json", JSON.stringify(notes, null, 2), "utf8");
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Delete a note by ID from db.json
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const data = await fs.readFile("db/db.json", "utf8");
    const notes = JSON.parse(data);

    const noteIdToDelete = req.params.id;
    const updatedNotes = notes.filter((note) => note.id !== noteIdToDelete);

    await fs.writeFile(
      "db/db.json",
      JSON.stringify(updatedNotes, null, 2),
      "utf8"
    );
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

function generateUniqueId() {
  // Implement a function to generate unique IDs for notes
  // This can be based on timestamps, random numbers, or other strategies
}

// app.use(routes);

app.listen(PORT, () => {
  console.log("Now listening to localhost 3001");
});
