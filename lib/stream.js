// Open the streaming connection from twitter

var settings = require("settings"),
    options = settings.twitter,
    track = options.track,
    TwitterNode = require("twitter-node").TwitterNode,
    t = new TwitterNode(options);
    limit = settings.limit;

function format(result) {
require("sys").puts(JSON.stringify(result));
    var u, name;

    if (!result.formatted) {
        u = result.user;
        name = u.screen_name;

        track.forEach(function (t) {
            result.text = result.text.replace(new RegExp(t, "g"), "");
        });
        result.tweet_url = "http://twitter.com/" + name +
            "/status/" + result.id;
        result.profile_image_url = u.profile_image_url;
        result.from_user = name;
        result.time = new Date(Date.parse(result.created_at)).toISOString();
        result.formatted = true;
    }
    return result;
}

exports.listen = function (tweets) {
    function onMessage(tweet) {
        var list = tweets.list,
            length = list.unshift(format(tweet));
        if (length > limit) { list.pop(); }
        tweets.updatedAt = Date.now();
    }

    t.addListener("tweet", onMessage).stream();
}
