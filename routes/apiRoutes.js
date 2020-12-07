 const fs = require('fs');
 const path = require('path');
 const { v4: uuidv4 } = require('uuid');
 
 module.exports = function(app){
     
    app.get('/api/notes', function(req, res){
        const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), "utf-8"));
        res.json(notes);
    });

    app.post('/api/notes', function(req, res){
        const newNote = req.body;
        newNote.id= uuidv4();
        const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), "utf-8"));
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err)=>{
            if(err) throw error;
        });
        res.json(newNote);
    })

    app.delete('/api/notes/:id', function(req, res){
       const noteId = req.params.id;
       console.log(__dirname);
       const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), "utf-8"));
       for (let i=0; i<notes.length; i++){
         if(notes[i].id === noteId){
             notes.splice(i,1);
         }
       }
       fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err)=>{
           if (err) throw error;
       })
       res.json(notes)  
    })
 }