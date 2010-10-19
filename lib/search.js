// get a list of tweets

var request = require("promised-io/http-client").request,
    defer = require("promise").defer,
    host = "search.twitter.com",
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
        options = {
            url: "http://" + host + "/search.json?" + q,
            headers: {
                "User-Agent": "NodeJS HTTP Client",
                "Host": host
            }
        };

    request(options).then(function (response) {
        response.body.join("").then(function (body) {
            promise.resolve(JSON.parse(body).results.map(format));
        });
    });

    return promise;
};
