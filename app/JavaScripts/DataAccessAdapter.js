const MongoClient   = require("mongodb").MongoClient;
var collection;
const collectionName = "Crimes";
const dbName = "Cluster0";
const url = "mongodb+srv://Admin:mynameismypassport@cluster0-7xnng.mongodb.net/test?retryWrites=true";

var DataBase = function () {
};

module.exports = DataBase;

DataBase.GetDB = function () {
    if (typeof DataBase.db === 'undefined') {
        DataBase.InitDB();
    }
    return DataBase.db;
};

DataBase.InitDB = function () {
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
};

DataBase.Disconnect = function () {
    if (DataBase.db) {
        DataBase.db.close();
    }
};

DataBase.BsonIdFromString = function (id) {
    var mongo = require('mongodb');
    var BSON = mongo.BSONPure;
    return new BSON.ObjectID(id);
};





