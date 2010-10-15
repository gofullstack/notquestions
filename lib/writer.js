// writes data to index.html
var fs = require("promised-io/fs"),
    render = require("mustache").to_html,
    indexTemplate = fs.read("templates/index.html"),
    partial = { tweet: fs.read("templates/tweet.html") };

function update(tweets) {
    var data = { tweets: tweets || [],
                 version: process.version,
                 time: new Date()
    };
    return render(indexTemplate, data, partial);
}

exports.write = function (tweets) {
    fs.write("public/index.html", update(tweets));
};
