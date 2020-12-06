// DEPENDENCIES
// Imports Express npm package
var express = require("express");

// Creates an "express" server
var app = express();

// Sets an initial port
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Testing a dummy path to confirm that the server is listening to the PORT
app.get('/welcome', function(req, res){
    res.send('Welcome to the note-taking app!');
});
  
// LISTENER
//  "starts" our server and listens to PORT
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
