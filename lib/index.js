// notquestions server

var Static = require("pintura/jsgi/static").Static,
    Cascade = require("pintura/jsgi/cascade").Cascade,
    settings = require("commonjs-utils/settings"),
    write = require("writer").write,
    tweets = [];

// Get initial results then listen on twitter steam
require("search").get(tweets).then(function (tweets) {
    write(tweets);
    require("stream").listen(tweets);
});

require("jsgi-node").start(Cascade([
        Static({ urls: [""], roots: ["public"] })
    ]),
    { port: settings.port || process.env.PORT || 8001 }
);
