console.log("Bot is starting up...");

let Twit = require('twit');

function logToFile(data) {
    let fs = require("fs");
    let json = JSON.stringify(data, null, 4);
    fs.writeFile("data.json", json, function (event) { });
}

let config = require("./config.js");
let T = new Twit(config);

queryterm = "corona"

T.get('search/tweets', { q: queryterm + ' since:2020-03-12', count: 10 }, function (err, data, response) {
    logToFile(data);
    for (const status of data.statuses) {
        console.log(`@${status.user.screen_name} tweeted about '${queryterm}' at ${status.created_at}`);
    }
});