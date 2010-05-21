// Open the streaming connection from twitter

var options = require("settings").twitter,
    TwitterNode = require("twitter-node").TwitterNode,
    t = new TwitterNode(options),
    rt = require("retweet").retweet;

t.addListener("tweet", function (tweet) {
    //rt(tweet.id);
}).stream();

exports.stream = t;
