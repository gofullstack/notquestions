// get a list of tweets

var http = require("http"),
    twitter = http.createClient(80, "search.twitter.com"),
    defer = require("promised-io/promise").defer,
    settings = require("commonjs-utils/settings"),
    track = settings.twitter.track,
    limit = settings.limit || 25,
    qs = require("querystring").stringify,
    q = qs({ q: track.join(","), rpp: limit });

// format a result
function format(result) {
    if (!result.formatted) {
        track.forEach(function (t) {
            result.text = result.text.replace(new RegExp(t, "g"), "");
        });
        result.tweet_url = "http://twitter.com/" + result.from_user +
            "/status/" + result.id;
        result.time = new Date(Date.parse(result.created_at)).toISOString();
        result.formatted = true;
    }

    return result;
}

exports.get = function () {
    var promise = defer(),
        results = [];

    twitter.request("GET", "/search.json?" + q, {
        "host": "search.twitter.com",
        "User-Agent": "NodeJS HTTP Client" }).
    on("response", function (response) {
        response.on("data", function (data) {
            results.push(data);
        }).on("end", function () {
            results  = JSON.parse(results.join("")).results.map(format);
            promise.resolve(results);
        });
    }).end();

    return promise;
};
