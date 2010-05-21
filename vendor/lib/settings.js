var fs = require("fs");

var settings = JSON.parse(fs.readFileSync("local.json"));
for(var i in settings){
	exports[i] = settings[i];
}
