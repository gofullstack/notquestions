// format a tweet
var track = require("commonjs-utils/settings").track;

// from a stream
function fromStream(result) {
    var u, name;

    u = result.user;
    name = u.screen_name;

    track.forEach(function (t) {
        result.text = String(result.text).replace(new RegExp(t, "g"), "");
    });
    result.tweet_url = "http://twitter.com/" + name +
        "/status/" + result.id;
    result.profile_image_url = u.profile_image_url;
    result.from_user = name;
}

// from a search result
function fromSearch(result) {
    track.forEach(function (t) {
        result.text = result.text.replace(new RegExp(t, "g"), "");
    });
    result.tweet_url = "http://twitter.com/" + result.from_user +
        "/status/" + result.id;
    return result;
}

exports.format = function (result) {
    if (typeof result.user === "object") { fromStream(result); }
    else { fromSearch(result); }
    result.time = new Date(Date.parse(result.created_at)).toISOString();
    return result;
};
