"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple database insertion and query for MongoDB
 * @author: Jirka Dell'Oro-Friedl
 */
var Mongo = require("mongodb");
console.log("Database starting");
var databaseURL = "mongodb://localhost:27017";
var databaseName = "Test";
var db;
var students;
// wenn wir auf heroku sind...
if (process.env.NODE_ENV == "production") {
    //    databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://seyfrieo:test123@ds237620.mlab.com:37620/studivz";
    databaseName = "studivz";
}
// handleConnect wird aufgerufen wenn der Versuch, die Connection zur Datenbank herzustellen, erfolgte
Mongo.MongoClient.connect(databaseURL, handleConnect);
function handleConnect(_e, _db) {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        students = db.collection("studis");
    }
}
function insert(_doc) {
    students.insertOne(_doc, handleInsert);
}
exports.insert = insert;
function handleInsert(_e) {
    console.log("Database insertion returned -> " + _e);
}
function findAll(_callback) {
    var cursor = students.find();
    cursor.toArray(prepareAnswer);
    function prepareAnswer(_e, studentArray) {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(studentArray));
    }
}
exports.findAll = findAll;
function findStudent(_matrikel, _callback) {
    var cursor = students.find({ "matrikel": _matrikel }).limit(1);
    cursor.next(prepareStudent);
    function prepareStudent(_e, student) {
        if (_e) {
            _callback("Error" + _e);
        }
        if (student) {
            _callback(JSON.stringify(student));
        }
        else {
            _callback("No Match");
        }
    }
}
exports.findStudent = findStudent;
//# sourceMappingURL=Database.js.map