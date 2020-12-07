// DEPENDENCIES
// Imports Express npm package
const express = require("express");

// Creates an "express" server
const app = express();

// Sets an initial port
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ROUTER
// Points server to a series of "route" files.
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// LISTENER
//  "starts" our server and listens to PORT
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
