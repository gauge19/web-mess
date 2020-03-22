const fs = require('fs');

function logToFile(data, fn = "data") {
    let json = JSON.stringify(data, null, 4);
    fs.writeFile(fn + ".json", json, function (event) { });
}

function randint(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createURL(baseurl, params) {
    let result = baseurl + "?";
    for (const key of Object.keys(params)) {
        result += key + "=" + params[key] + "&";
    }

    return encodeURI(result.slice(0, -1)); // remove '&' from the end
}

module.exports = { logToFile, randint, createURL };