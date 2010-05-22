// get a list of tweets

var http = require("http"),
    twitter = http.createClient(80, "search.twitter.com"),
    Promise = require("promise").Promise,
    track = require("settings").twitter.track,
    qs = require("querystring").stringify,
    q = qs({ q: track.join(",") });

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

exports.get = function (tweets) {
    var promise = new Promise(),
        list = tweets.list,
        results = [];

    // only update every i seconds
    function shouldUpdate(tweets) {
        var u = tweets.updatedAt,
            i = 300000; // interval (5 min)
        return !u || (Date.now() - u) > i;
    };

    if (shouldUpdate(tweets)) {
        twitter.request("GET", "/search.json?" + q, {
            "host": "search.twitter.com",
            "User-Agent": "NodeJS HTTP Client" }).
        addListener("response", function (response) {
            response.addListener("data", function (data) {
                results.push(data);
            }).addListener("end", function () {
                tweets.list = JSON.parse(results.join("")).results.map(format);
                tweets.updatedAt = Date.now();
                promise.resolve(tweets);
            });
        }).end();
    } else { promise.resolve(tweets); }
    return promise;
};
