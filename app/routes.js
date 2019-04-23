
// Dependencies
const MongoClient   = require("mongodb").MongoClient;

// Connect to MongoDB Atlas
// -------------------------------------------------------
const url = "mongodb+srv://Admin:mynameismypassport@cluster0-7xnng.mongodb.net/test?retryWrites=true";
const dbName = "Cluster0";
const collectionName = "Crimes";
var collection;
var crimesDemoCollection;

MongoClient.connect(url, function (err, client) {
    if (err) {
        console.log('Error connecting to MongoDB Atlas\n', err);
    }
    console.log('Connected...');
    collection = client.db(dbName).collection(collectionName);
    crimesDemoCollection = client.db(dbName).collection("crimesDemo");
    crimes = collection.find({}).toArray((error, result) => {
        if (error) {
            return result.status(500).send(error);
        }
        //console.log(result);
    });
});

// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/crimes', function (req, response) {

        // Uses Mongoose schema to run the search (empty conditions)
        collection.find({}).toArray((error, result) => {
            if(error) {
                return response.status(500).send(error);
            }


            return response.json(result);
        });
    });

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/crimesDemo', function (req, response) {

        // Uses Mongoose schema to run the search (empty conditions)
        //collectionName="crimesDemo";
        crimesDemoCollection.find({}).toArray((error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            return response.json(result);
        });
    });
};
