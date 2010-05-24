// notquestions server

var Static = require("jsgi/static").Static,
    Cascade = require("jsgi/cascade").Cascade,
    Index = require("jsgi/index").Index,
    tweets = { list: [] };

// Get initial results then listen on twitter steam
require("search").get(tweets).then(function () {
    require("stream").listen(tweets)
});

exports.start = function (port) {
    var options = { port: port };

    require("jsgi-node").start(
        Cascade([
            Static({ urls: [""], roots: ["public"] }),
            Index(tweets)
        ]),
        options
    );
};
