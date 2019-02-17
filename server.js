
// -----------------------------------------------------
var express         = require('express');
const MongoClient   = require("mongodb").MongoClient;
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var app             = express();

// Express Configuration
// -----------------------------------------------------
// Sets the connection to MongoDB
//mongoose.connect("mongodb://localhost/MeanMapApp");

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
//require('./app/indexMap.js')(app);

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);

const url = "mongodb+srv://Admin:mynameismypassport@cluster0-7xnng.mongodb.net/test?retryWrites=true";
const dbName = "Cluster0";
const collectionName = "Crimes";
var collection;

MongoClient.connect(url, function (err, client) {
    if (err) {
        console.log('Error connecting to MongoDB Atlas\n', err);
    }
    console.log('Connected...');
    collection = client.db(dbName).collection(collectionName);
    crimes = collection.find({}).toArray((error, result) => {
        if (error) {
            return result.status(500).send(error);
        }
        console.log(result);
    });
});

