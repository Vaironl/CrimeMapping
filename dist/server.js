"use strict";

// -----------------------------------------------------
var express = require('express');

var port = process.env.PORT || 3000;

var morgan = require('morgan');

var bodyParser = require('body-parser');

var methodOverride = require('method-override');

var app = express(); // Express Configuration
// -----------------------------------------------------
// Sets the connection to MongoDB
//mongoose.connect("mongodb://localhost/MeanMapApp");
// Logging and Parsing

app.use(express.static(__dirname + '/public')); // sets the static files location to public

app.use('/app', express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components')); // Use BowerComponents

app.use(morgan('dev')); // log with Morgan

app.use(bodyParser.json()); // parse application/json

app.use(bodyParser.urlencoded({
  extended: true
})); // parse application/x-www-form-urlencoded

app.use(bodyParser.text()); // allows bodyParser to look at raw text

app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json

app.use(methodOverride()); //Start the database

require('./app/JavaScripts/DataAccessAdapter').InitDB(); // Routes
// ------------------------------------------------------
//require('./app/indexMap.js')(app);
// Listen
// -------------------------------------------------------


app.listen(port);
console.log('App listening on port ' + port);
//# sourceMappingURL=server.js.map