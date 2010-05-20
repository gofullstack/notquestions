// static handler

var path = require("path"),
    sys = require("sys"),
    paperboy = require("paperboy"),
    public = path.join(path.dirname(__filename), "..", "public");

function err(status, message, res) {
    res.writeHead(status, { "Content-Type": "text/plain" });
    res.write(message);
    res.end();
};

exports.deliver = function (req, res) {
    paperboy.deliver(public, req, res)
        .error(function (status, message) { err(status, message, res); })
        .otherwise(function () { err(404, "Not Found", res); });
};
