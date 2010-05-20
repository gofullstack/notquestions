// notquestions server bootstrap
require.paths.push("lib");
require("notquestions").listen(process.env.PORT || 8001);
