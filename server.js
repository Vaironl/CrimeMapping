
// -----------------------------------------------------
var express         = require('express');

var mongoose        = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var readline = require ('readline');
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var app             = express();

// Logging and Parsing
app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
app.use('/app',express.static(__dirname + '/app'));
app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents
app.use(morgan('dev'));                                         // log with Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride());

// Routes
// ------------------------------------------------------
require('./app/routes.js')(app);

// SafetyScoreData
//-------------------------------------------------------
//require('./app/Modules/SafetyScore')(app);

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);



