// notquestions server

var Static = require("jsgi/static").Static,
    Cascade = require("jsgi/cascade").Cascade,
    Index = require("jsgi/index").Index,
    Stream = require("jsgi/stream").Stream,
    stream = require("stream").stream,
    tweets = [];

exports.start = function (port) {
    var options = { port: port };

    require("jsgi-node").start(
        Cascade([
            Static({ urls: [""], roots: ["public"] }),
            Index(tweets),
            Stream(stream, tweets)
        ]),
        options
    );
};
