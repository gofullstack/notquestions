// notquestions server

var Static = require("pintura/jsgi/static").Static,
    Cascade = require("pintura/jsgi/cascade").Cascade,
    tweets = [];

// Get initial results then listen on twitter steam
require("search").get(tweets).then(function (tweets) {
    require("writer").write(tweets);
    // todo: stream
});

require("jsgi-node").start(Cascade([
        Static({ urls: [""], roots: ["public"] })
    ]),
    { port: Number(process.env.PORT) || 8001 }
);
