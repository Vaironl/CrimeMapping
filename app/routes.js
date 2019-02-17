
// Dependencies
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
        console.log(result);
    });
});

// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/users', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(users);
        });
    });

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
};