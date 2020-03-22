function createURL(baseurl, params) {
    let result = baseurl + "?";
    for (const key of Object.keys(params)) {
        if (Array.isArray(params[key])) {
            for (const item of params[key]) {
                result += key + "=" + item + "&"
            }
        } else {
            result += key + "=" + params[key] + "&";
        }
    }

    return encodeURI(result.slice(0, -1)); // remove '&' from the end
}

/**
 * Fetches JSON data from URL and loggs it to the console. Should be used for testing.
 * @param {string} url URL to fetch 
 */
function easy_fetch(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

/**
 * Converts a given degree into radians.
 * @param {number} deg Degrees to be converted
 * @returns {number} Degrees converted into Radians 
 */
function toRadians(deg) {
    return deg * (Math.PI / 180);
}

/**
     * Calculates the distance between two coordinates based on the "haversine" fomula.
     * @param {Object} p1 First point
     * @param {Object} p2 Second point
     * @returns {number} Distance in meters.
     */
function distanceBetween(p1, p2) {

    console.log("calculating distnace between", p1, "and", p2);


    const r = 6371e3; // earth's mean radius in meters
    let phi1 = toRadians(p1.lat);
    let phi2 = toRadians(p2.lat);
    let dphi = toRadians(p2.lat - p1.lat);
    let dlambda = toRadians(p2.lon - p1.lon);

    let a = Math.sin(dphi / 2) ** 2 +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(dlambda / 2) ** 2;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return r * c;
}

// sample API calls
//easy_fetch("http://api.open-notify.org/iss-now.json")
//easy_fetch('https://3.vbb.transport.rest/stops/900000013102');

// google geolocation from /location API
let google;
let browser;
fetch("/location")
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        google = data.location.lat + "," + data.location.lng
        document.getElementById("latitude-google").textContent = data.location.lat
        document.getElementById("longitude-google").textContent = data.location.lng

    })
    .catch(error => console.log(error));

// browser geolocation
document.getElementById('geolocate').addEventListener('click', event => {
    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(position => {
            // get position and update DOM elements
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            browser = lat + "," + lon

            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;

            // output distance between two locations
            const p1 = {
                lat: parseFloat(document.getElementById("latitude-google").innerHTML),
                lon: parseFloat(document.getElementById("longitude-google").innerHTML)
            }
            const p2 = {
                lat: parseFloat(document.getElementById("latitude").innerHTML),
                lon: parseFloat(document.getElementById("longitude").innerHTML)
            }
            document.getElementById("distance").textContent = Math.round(distanceBetween(p1, p2)) / 1000;

            let static_url = "http://maps.googleapis.com/maps/api/staticmap"
            let params = {
                zoom: 10,
                size: "400x300",
                markers: [
                    "color:blue|label:G|" + google,
                    "color:green|label:B|" + browser
                ],
                path: "color:0xff0000ff|weight:4|" + google + "|" + browser,
                sensor: false,
                key: "AIzaSyDTUSe7oemC70SFPtSAj_VMafkr8JvT4Po"
            }
            //let img_url = "http://maps.googleapis.com/maps/api/staticmap?zoom=10&size=400x300&sensor=false&markers=color:blue%7Clabel:G%7C" + google + "&markers=color:red%7Clabel:B%7C" + browser + "&key=AIzaSyDTUSe7oemC70SFPtSAj_VMafkr8JvT4Po";
            let img_url = createURL(static_url, params)
            document.getElementById("mapholder").innerHTML = "<img src='" + img_url + "'>";

            // send data to server
            const data = { lat, lon };
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            fetch('/api', options)
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.log("Error:", error));
        });
    } else {
        console.log('geolocation not available');
    }
});
