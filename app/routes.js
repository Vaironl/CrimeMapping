
// Dependencies
<<<<<<< .merge_file_a20576
const MongoClient   = require("mongodb").MongoClient;

// Connect to MongoDB Atlas
// -------------------------------------------------------
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
        //console.log(result);
    });
});
=======
var mongoose        = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
var User            = require('./model.js');
>>>>>>> .merge_file_a14240

// Opens App Routes
module.exports = function(app) {

    /*// Connect to MongoDB Atlas
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

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/crimes', function (req, response) {

        // Uses Mongoose schema to run the search (empty conditions)
<<<<<<< .merge_file_a20576
        collection.find({}).toArray((error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            return response.json(result);
        });
    });
};
=======
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(users);
        });
    });

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    /*app.get('/crimes', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(users);
        });
    });*/

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/users', function(req, res){

        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newuser = new User(req.body);

        // New User is saved in the db.
        newuser.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });
/*
    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/crimes', function(req, res){

        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newuser = new User(req.body);

        // New User is saved in the db.
        newuser.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });*/
};
>>>>>>> .merge_file_a14240
