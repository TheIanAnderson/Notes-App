const notes = require('express').Router()
const fs = require("fs");
const uuid = require('../helpers/uuid')

//Reads the current data and parses it
notes.get("/", (req, res) => {
    let rawdata = fs.readFileSync('./db/db.json');
    let currentNotes = JSON.parse(rawdata);
    res.json(currentNotes)});

//Function to add new data
notes.post("/", (req, res) => {
  console.info(`${req.method} request received`);

  //Logs the user input
  console.log(req.body)

  //if there's not note title in the user's input, it'll return a response 
  if (!req.body.title) {
    res.json("Request must at least contain a title for the note");
    return;
  }

  let rawdata = fs.readFileSync('./db/db.json');
  let currentNotes = JSON.parse(rawdata);
  
  //Creates a new note from the body
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid(),
  }

  //Pushes the newNote
  currentNotes.push(newNote)
  //logs the currentNotes after the new note has been pushed
  console.log(currentNotes);

  //Stringifies the current notes to write in the database
  var dataToSave = JSON.stringify(currentNotes)
  fs.writeFileSync('./db/db.json', dataToSave);
  res.json("New Note written!")
});

notes.delete("/:id",(req,res,next)=> {
    //Gets the id params of the note to be deleted
    const idToDelete = req.params.id

    //Reads and parses the current data
    let rawdata = fs.readFileSync('./db/db.json');
    let currentNotes = JSON.parse(rawdata);
    console.info(`${req.method} request received`)

    //Identifies the id of the note to be deleted and puts it in an index
    const noteToDelete = currentNotes.find(el => el.id === idToDelete)
    const index = currentNotes.indexOf(noteToDelete)

    //Takes the index of the note and deletes the note from the database
    currentNotes.splice(index,1)
    //Logs the currentNotes after the note has been deleted
    console.log(currentNotes);

    var dataToSave = JSON.stringify(currentNotes)
    fs.writeFileSync('./db/db.json', dataToSave);
    res.json("Note deleted!")
})

module.exports = notes;