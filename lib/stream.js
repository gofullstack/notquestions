/*// Open the streaming connection from twitter*/

var settings = require("commonjs-utils/settings");
    options = settings.twitter,
    track = options.track,
    //tweetstream = require("tweetstream"),
    limit = settings.limit;

//function format(result) {
    //var u, name;

    //if (!result.formatted) {
        //u = result.user;
        //name = u.screen_name;

        //track.forEach(function (t) {
            //result.text = result.text.replace(new RegExp(t, "g"), "");
        //});
        //result.tweet_url = "http://twitter.com/" + name +
            //"/status/" + result.id;
        //result.profile_image_url = u.profile_image_url;
        //result.from_user = name;
        //result.time = new Date(Date.parse(result.created_at)).toISOString();
        //result.formatted = true;
    //}
    //return result;
//}

exports.listen = function (tweets) {
    //function onMessage(tweet) {
        //var list = tweets.list,
            //length = list.unshift(format(tweet));
        //if (length > limit) { list.pop(); }
        //tweets.updatedAt = Date.now();
    //}

    //t.addListener("tweet", onMessage).stream();
};
