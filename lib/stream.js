// get a stream of tweets

var settings = require("commonjs-utils/settings");

exports.get = function () {
    var request = require("promised-io/http-client").request,
        deferred = require("promise").defer(),
        host = "stream.twitter.com",
        track = settings.track,
        qs = require("querystring").stringify,
        toBase64 = require("commonjs-utils/base64").encode,
        auth = "Basic " + toBase64(settings.username + ":" + settings.password),
        q = qs({ track: track.join(",") }),

        options = {
            url: "http://" + host + "/1/statuses/filter.json?" + q,
            encoding: "utf8",
            headers: {
                "Authorization": auth,
                "Connection": "keep-alive",
                "Host": host,
                "User-Agent": "NodeJS HTTP Client"
            }
        };

    function req() {
        request(options).then(function (response) {
            deferred.resolve(response.body);
        }, req);
    }

    req();

    return deferred.promise;
};

// process a stream
exports.process = function (tweets) {
    var format = require("./formatter").format,
        limit = settings.limit,
        write = require("writer").write;

    return function (stream) {
        var partialTweet = "";

        stream.forEach(function (tweet) {
            // when JSON fails to parse, create a buffer until what comes in
            // is valid
            try {
                tweet = JSON.parse(partialTweet + tweet);
            } catch (e) { partialTweet += tweet; }

            if (typeof tweet === "object") {
                tweet = format(tweet);
                tweets.unshift(tweet);
                if (tweets.length > limit) { tweets.pop(); }
                write(tweets);
                partialTweet = "";
            }
        });
    };
};
