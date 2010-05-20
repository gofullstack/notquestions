// notquestions server

var http = require("http"),
    server;

server = http.createServer(function (req, res) {
    // Handle static files
    require("static").deliver(req, res);
});

exports.listen = function (port) { server.listen(port); };
