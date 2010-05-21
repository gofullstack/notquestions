// notquestions server bootstrap
require.paths.push("lib");
require.paths.push("vendor/lib");
require("notquestions").start(process.env.PORT || 8001);
