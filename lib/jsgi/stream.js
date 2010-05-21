
exports.Stream = function (stream, tweets) {
    return function (request) {
        var path = request.pathInfo;

        if (path === "/stream") {
            return {
                status: 200,
                headers: { "Content-Type": "application/json" },
                // TODO: Stream tweets
                body: { forEach: function (write) { } }
            };
        } else {
            return {
                status: 404,
                headers: {},
                body: [path + " not found"]
            };
        }
    }
};
