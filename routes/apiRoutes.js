 let notes = require('../db/db.json');
 const { v4: uuidv4 } = require('uuid');
 const fs = require('fs');
 const path = require('path');

 
 
 module.exports = function(app){
    app.get('/api/notes', function(req, res){
        res.json(notes);
    });

    app.post('/api/notes', function(req, res){
        const newNote = req.body;
        newNote.id= uuidv4();
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err)=>{
            if(err) throw error;
        });
        res.json(newNote);
    })

    app.delete('/api/notes/:id', function(req, res){
       const noteId = req.params.id;
       console.log(__dirname);
       let data = fs.readFileSync(path.join(__dirname, '../db/db.json'), "utf-8");
       data = JSON.parse(data);
       for (let i=0; i<data.length; i++){
         if(data[i].id === noteId){
             data.splice(i,1);
         }
       }
       fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(data), (err)=>{
           if (err) throw error;
       })
       notes = data;
       res.json(notes)  
    })
 }