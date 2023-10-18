const express = require('express');

//imports the file containing routes
const notesRouter = require('./notes')

//creates an instance of express to apply the middleware and routing
const app = express();

app.use('/notes', notesRouter)

module.exports = app;
