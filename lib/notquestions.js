// notquestions server

var Static = require("jsgi/static").Static,
    Cascade = require("jsgi/cascade").Cascade,
    Index = require("page").Index;

var tweets = [];

// retweet a tweet
// require("rewteet");

//require("stream");

exports.start = function (port) {
    var options = { port: port };

    require("jsgi-node").start(
        Cascade([
            Static({ urls: [""], roots: ["public"] }),
            function (request) { return Index(request, tweets); }
        ]),
        options
    );
};
