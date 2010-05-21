// get a list of tweets

var http = require("http"),
    twitter = http.createClient(80, "search.twitter.com"),
    Promise = require("promise").Promise,
    qs = require("querystring").stringify,
    q = qs({ q: require("settings").twitter.track.join(",") });

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
                promise.resolve(container);
            });
        }).end();
    } else { promise.resolve(container); }
    return promise;
};
