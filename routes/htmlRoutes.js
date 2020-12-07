// importing path package
const path = require('path');

// defining, handling and exporting html routes for GET requests
module.exports = function(app){

    app.get('/notes', function(req, res){
       res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // if no matching route is found, default to Home page
    app.get('*', function(req, res){
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
 }