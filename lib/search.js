// get a list of tweets

var http = require("http"),
    twitter = http.createClient(80, "search.twitter.com"),
    Promise = require("promise").Promise,
    track = require("settings").twitter.track,
    qs = require("querystring").stringify,
    q = qs({ q: track.join(",") });

// format a result
function format(result) {
    require("sys").puts(JSON.stringify(result));
    track.forEach(function (t) {
        result.text = result.text.replace(new RegExp(t, "g"), "");
    });
    result.tweet_url = "http://twitter.com/" + result.from_user + "/status/" +
        result.id;
    return result;
}

exports.get = function (container) {
    var promise = new Promise(),
        results = [];
    if (container.length === 0) {
        twitter.request("GET", "/search.json?" + q, {
            "host": "search.twitter.com",
            "User-Agent": "NodeJS HTTP Client" }).
        addListener("response", function (response) {
            response.addListener("data", function (data) {
                results.push(data);
            }).addListener("end", function () {
                container = JSON.parse(results.join("")).results;
                promise.resolve(container.map(format));
            });
        }).end();
    } else { promise.resolve(container); }
    return promise;
};
