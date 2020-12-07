 const notes = require('../db/db.json');
 const { v4: uuidv4 } = require('uuid');
 
 module.exports = function(app){

    app.get('/api/notes', function(req, res){
        res.json(notes);
    });

    app.post('/api/notes', function(req, res){
        const newNote = req.body;
        newNote.id= uuidv4();
        notes.push(newNote);
        res.json(notes);
    })
 }