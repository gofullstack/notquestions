// get a list of tweets

var http = require("http"),
    twitter = http.createClient(80, "search.twitter.com"),
    print = require("sys").puts;


exports.get = function (container) {
 twitter.request("GET", "/search.json").addListener("response", function (response) {
    print(Object.keys(twitter));
    print(JSON.stringify(response.headers));
    response.addListener("data", function (data) {
        print(data);
    });
}).end();
    container.unshift("..");
};
