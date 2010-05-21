// retweet a tweet

var settings = require("settings").twitter,
    http = require("http"),
    twitter = http.createClient(80, "api.twitter.com"),
    print = require("sys").puts;

exports.rewteet = function (id) {
    var path = "/1/statuses/retweet/" + id + ".xml",
        req = twitter.request("POST", path, {});

    print("NYI");
};
