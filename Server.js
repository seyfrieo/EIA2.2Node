"use strict";
/**
 * Simple server managing between client and database
 * @author: Jirka Dell'Oro-Friedl
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Http = require("http");
var Url = require("url");
var Database = require("./Database");
console.log("Server starting");
var port = process.env.PORT;
if (port == undefined)
    port = 8100;
var server = Http.createServer();
server.addListener("request", handleRequest);
server.listen(port);
function handleRequest(_request, _response) {
    console.log("Request received");
    var query = Url.parse(_request.url, true).query;
    var command = query["command"];
    switch (command) {
        case "insert":
            var obj = JSON.parse(query["data"]);
            var _name = obj.name;
            var _firstname = obj.firstname;
            var _matrikel = obj.matrikel.toString();
            var _age = obj.age;
            var _gender = obj.gender;
            var _studiengang = obj.studiengang;
            var student = void 0;
            student = {
                name: _name,
                firstname: _firstname,
                matrikel: parseInt(_matrikel),
                age: _age,
                gender: _gender,
                studiengang: _studiengang
            };
            Database.insert(student);
            respond(_response, "storing data");
            break;
        case "refresh":
            Database.findAll(function (json) {
                respond(_response, json);
            });
            break;
        case "search":
            var matrikel = parseInt(query["searchFor"]);
            Database.findStudent(matrikel, function (json) {
                respond(_response, json);
            });
            break;
        default:
            respond(_response, "unknown command: " + command);
            break;
    }
}
function respond(_response, _text) {
    //console.log("Preparing response: " + _text);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}
//# sourceMappingURL=Server.js.map