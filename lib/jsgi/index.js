// build the index page using a template

var render = require("mustache").to_html;
    partial = { tweet: require("fs").readFileSync("templates/tweet.html") },
    fs = require("fs-promise");

exports.Index = function (tweets) {
    return function (request) {
        var path = request.pathInfo;

        return fs.readFile("public/index.html").then(function (body) {
            if (path === "/") {
                // TODO
                //require("search").get(tweets);
                //tweets = [{ text: "hi" }, {text: "there" }];
                return {
                    status: 200,
                    headers: { "Content-Type": "text/html" },
                    body: [render(body.toString(), { tweets: tweets }, partial)]
                };
            } else {
                return {
                    status: 404,
                    headers: {},
                    body: [path + " not found"]
                };
            }
        });
    }
};