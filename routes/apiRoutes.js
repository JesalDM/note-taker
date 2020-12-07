 const notes = require('../db/db.json');
 console.log(notes);
 
 module.exports = function(app){

    app.get('/api/notes', function(req, res){
        console.log("Retrieving note list");
        res.json(notes);
    });
 }