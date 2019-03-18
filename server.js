
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

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);

/*
// Connect to MongoDB Atlas
// -------------------------------------------------------
const url =  process.env.DB_CONN;
const dbName = "Cluster0";
const collectionName = "Crimes";

MongoClient.connect(url,function(err, client){
    if(err){
        console.log('Error connecting to MongoDB Atlas\n',err);
    }
    console.log('Connected...');
    const collection = client.db(dbName).collection(collectionName);
});*/

console.log(Stringify(collection));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(async function() {
    // Connection URL
    let username = new Promise((resolve, reject) => {
        rl.question('What is your username? ', (user_name) => {
            username = user_name;
            if (username != null)
            {

                setTimeout(() => resolve(username), 0);
            }

        });
    });
    // I don't know of another way to continue follow
    await username;

    let password = new Promise((resolve, reject) => {
        rl.question('What is your password? ', (answer) => {
            password = answer;
            if (password != null)
            {

                setTimeout(() => resolve(password), 0);
            }
        });
    });

    let url = await password;

    console.log(url);

    url =  `mongodb+srv://${username}:${password}@cluster0-7xnng.mongodb.net/test?retryWrites=true`;
    // Database Name
    const dbName = 'Cluster0';
    const client = new MongoClient(url);

    try {
        // Use connect method to connect to the Server
        await client.connect();

        const db = client.db(dbName);

        console.log("MongoDB queries here");
        let query = db.collection('Crimes').count();
        query.then(function () {
            console.log(query);

        })


    } catch (err) {
        console.log(err.stack);
    }


    client.close();
})();

