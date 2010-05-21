// notquestions server

var Static = require("jsgi/static").Static,
    Cascade = require("jsgi/cascade").Cascade;

// TODO: Make this templated and read from a twitter stream
var sys = require("sys");
var fs = require("fs-promise");
function Index(request) {
    return fs.readFile("public/index.html").then(function (body) { 
           return {
            status: 200,
             headers: { "Content-Type": "text/html" },
             body: [body]
           };
    });
}

exports.start = function (port) {
    var options = { port: port };

    require("jsgi-node").start(
        Cascade([
            Static({ urls: [""], roots: ["public"] }),
            function (request) { return Index(request); }
        ]),
        options
    );
};
