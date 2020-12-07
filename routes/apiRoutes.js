 // Dependencies
 const fs = require('fs');
 const path = require('path');
 const { v4: uuidv4 } = require('uuid');
 
 // Routing
 module.exports = function(app){

    // API GET Request
    // This code handles the getNotes request from the client by reading the db.json file and sending the JSON list of existing saved notes to the client
    app.get('/api/notes', function(req, res){
        const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), "utf-8"));
        res.json(notes);
    });

    // API POST Request
    // This code handles when a user saves a note and the client submits data to the server. The new note JSON is pushed to the db.json file
    app.post('/api/notes', function(req, res){
        const newNote = req.body;
        // adding a new key "id" to the new note object and generating a random id value using the uuid npm package
        newNote.id= uuidv4();
        // reading the db.json file and and assigning it to a variable "notes" after parsing it 
        const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), "utf-8"));
        // adding the newly created note to the existing notes list
        notes.push(newNote);
        // rewriting the db.json file with the newly added note
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err)=>{
            if(err) throw error;
        });
        // sending the new note to the client
        res.json(newNote);
    })

    // API DELETE Request
    // This code handles when a user deletes a note and the client submits the unique note id to the server. The corresponding note is deleted from the db.json file
    app.delete('/api/notes/:id', function(req, res){
       // grabs the id from the request parameters sent by the client
       const noteId = req.params.id;
       // reading the db.json file and and assigning it to a variable "notes" after parsing it 
       const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), "utf-8"));
       // looping through the array to find the note id that matches with the note deleted by the user
       for (let i=0; i<notes.length; i++){
         if(notes[i].id === noteId){
            // removes the note at that index
            notes.splice(i,1);
         }
       }
       // rewriting the db.json file after removing the user deleted note
       fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err)=>{
           if (err) throw error;
       });
       // sending the updated notes list to the client
       res.json(notes)  
    })
 }