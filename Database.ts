/**
 * Simple database insertion and query for MongoDB
 * @author: Jirka Dell'Oro-Friedl
 */
import * as Mongo from "mongodb";
console.log("Database starting");

let databaseURL: string = "mongodb://localhost:27017";
let databaseName: string = "Test";
let db: Mongo.Db;
let hs: Mongo.Collection;

// running on heroku?
if (process.env.NODE_ENV == "production") {
    //    databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://admin:admin123@ds239055.mlab.com:39055/rodelbahn";
    databaseName = "rodelbahn";
}

// try to connect to database, then activate callback "handleConnect" 
Mongo.MongoClient.connect(databaseURL, handleConnect);

// connect-handler receives two standard parameters, an error object and a database object
function handleConnect(_e: Mongo.MongoError, _db: Mongo.Db): void {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        hs = db.collection("spieler");
    }
}

export function insert(_doc: playerData): void {
    // try insertion then activate callback "handleInsert"
    hs.insertOne(_doc, handleInsert);
}

// insertion-handler receives an error object as standard parameter
function handleInsert(_e: Mongo.MongoError): void {
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
export function findAll(_callback: Function): void {
    // cursor points to the retreived set of documents in memory
    var cursor: Mongo.Cursor = hs.find();
    // try to convert to array, then activate callback "prepareAnswer"
    cursor.toArray(prepareAnswer);

    // toArray-handler receives two standard parameters, an error object and the array
    // implemented as inner function, so _callback is in scope
    function prepareAnswer(_e: Mongo.MongoError, playerArray: playerData[]): void {
        if (_e)
            _callback("Error" + _e);
        else
            // stringify creates a json-string, passed it back to _callback
            _callback(JSON.stringify(playerArray));
    }
}
