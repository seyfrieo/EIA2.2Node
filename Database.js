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
var hs;
// running on heroku?
if (process.env.NODE_ENV == "production") {
    //    databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://admin:admin123@ds239055.mlab.com:39055/rodelbahn";
    databaseName = "rodelbahn";
}
// try to connect to database, then activate callback "handleConnect" 
Mongo.MongoClient.connect(databaseURL, handleConnect);
// connect-handler receives two standard parameters, an error object and a database object
function handleConnect(_e, _db) {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        hs = db.collection("spieler");
    }
}
function insert(_doc) {
    // try insertion then activate callback "handleInsert"
    hs.insertOne(_doc, handleInsert);
}
exports.insert = insert;
// insertion-handler receives an error object as standard parameter
function handleInsert(_e) {
    console.log("Database insertion returned -> " + _e);
}
// export function search(_callback: Function, _matrikel: string): void {
//     var cursor: Mongo.Cursor = hs.find();
//     cursor.toArray(prepareAnswer);
//     function prepareAnswer(_e: Mongo.MongoError, playerArray: playerData[]): void {
//         if (_e)
//             _callback("Error" + _e);
//         else
//
//             for (let i: number = 0; i < playerArray.length; i++) {
//                 if (playerArray[i].score == Number(_matrikel)) {
//                     _callback(JSON.stringify(playerArray[i]));
//                 }
//             }
//     }
// }
// try to fetch all documents from database, then activate callback
function findAll(_callback) {
    // cursor points to the retreived set of documents in memory
    var cursor = hs.find();
    // try to convert to array, then activate callback "prepareAnswer"
    cursor.toArray(prepareAnswer);
    // toArray-handler receives two standard parameters, an error object and the array
    // implemented as inner function, so _callback is in scope
    function prepareAnswer(_e, playerArray) {
        if (_e)
            _callback("Error" + _e);
        else
            // stringify creates a json-string, passed it back to _callback
            _callback(JSON.stringify(playerArray));
    }
}
exports.findAll = findAll;
//# sourceMappingURL=Database.js.map