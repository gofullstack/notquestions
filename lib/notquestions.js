// notquestions server

var http = require("http"),
    print = require("sys").puts,
    fs = require("fs"),
    path = require("path"),
    public = path.join(path.dirname(__filename), "..", "public"),
    server;

server = http.createServer(function (req, res) {
    var url = req.url;

    // Home page
    if (url === "/") {
        fs.readFile(path.join(public, "index.html"), function (err, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    // JSON response
    } else if (url === "/api") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("{}");
    // Static files or 404
    } else { require("static").deliver(public, req, res); }
});

exports.listen = function (port) { server.listen(port); };
