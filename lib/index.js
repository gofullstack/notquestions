// notquestions server

var Static = require("pintura/jsgi/static").Static,
    Cascade = require("pintura/jsgi/cascade").Cascade,
    settings = require("commonjs-utils/settings"),
    write = require("writer").write,
    tweets = [];

// Get initial results then listen on twitter steam
function search() {
    require("search").get().then(function (newTweets) {
        if (newTweets.length >= tweets.length) { tweets = newTweets; }
        write(tweets);
    });
}

// initial write
search();

// do it on a timeout
setInterval(search, 5000);

require("jsgi-node").start(Cascade([
        Static({ urls: [""], roots: ["public"] })
    ]),
    { port: settings.port || process.env.PORT || 8001 }
);
