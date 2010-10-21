// get a list of tweets

var request = require("promised-io/http-client").request,
    defer = require("promise").defer,
    host = "search.twitter.com",
    settings = require("commonjs-utils/settings"),
    track = settings.track,
    limit = settings.limit || 25,
    format = require("./formatter").format,
    qs = require("querystring").stringify,
    q = qs({ q: track.join(","), rpp: limit });

exports.get = function () {
    var deferred = defer(),
        options = {
            url: "http://" + host + "/search.json?" + q,
            headers: {
                "User-Agent": "NodeJS HTTP Client",
                "Host": host
            }
        };

    request(options).then(function (response) {
        response.body.join("").then(function (body) {
            var results;
            try {
                results = JSON.parse(body).results.map(format);
            } catch (e) { results = []; }
            deferred.resolve(results);
        });
    });

    return deferred.promise;
};
