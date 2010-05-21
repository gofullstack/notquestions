
var options = require("settings").twitter,
    TwitterNode = require("twitter-node").TwitterNode,
    t = new TwitterNode(options),
    rt = require("retweet").retweet;

t.addListener("tweet", function (tweet) {
    require("sys").puts(JSON.stringify(tweet));
    //rt(tweet.id);
}).stream();
