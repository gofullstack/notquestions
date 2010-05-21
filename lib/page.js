// build the index page using a template

var render = require("mustache").to_html;
    partial = { tweet: require("fs").readFileSync("templates/tweet.html") },
    fs = require("fs-promise");


exports.Index = function (request, tweets) {
    return fs.readFile("public/index.html").
        then(function (body) {
            // TODO
            //require("search").get(tweets);
            //tweets = [{ text: "hi" }, {text: "there" }];
            return render(body.toString(), { tweets: tweets }, partial);
        }).
        then(function (body) {
            return {
                status: 200,
                headers: { "Content-Type": "text/html" },
                body: [body]
            };
        });
};
