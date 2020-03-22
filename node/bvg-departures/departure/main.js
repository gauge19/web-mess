/**
 * Converts a given degree into radians.
 * @param {number} deg Degrees to be converted
 * @returns {number} Degrees converted into Radians 
 */
function toRadians(deg) {
    return deg * (Math.PI / 180);
}

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
     * Calculates the distance between two coordinates based on the "haversine" fomula.
     * @param {Object} p1 First point
     * @param {Object} p2 Second point
     * @returns {number} Distance in meters.
     */
function distanceBetween(p1, p2) {

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

//console.log("succesfully loaded main.js")

function getGeolocation() {
    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position => {

            // get position
            lat = position.coords.latitude
            lon = position.coords.longitude
            let coords = { lat, lon }
            browser = lat + "," + lon

            // get data from server
            let table = document.getElementById("stations")
            res = await fetch('/nearest/' + browser)
            data = await res.json()
            console.log(data)

            // add data to table
            let index = 1
            for (const station of Object.values(data)) {
                // add index to station object so it can be displayed properly in the table and on the map
                station["index"] = index
                index += 1

                let row = document.createElement("TR")
                let table_values = [station.index, station.name, station.id, station.distance]

                for (let i = 0; i < table_values.length; i++) {
                    let cell = document.createElement("TD")
                    if (i == 1) {
                        // add link to station names which redirects to departures site
                        cell.innerHTML = '<a href="/departures/' + station.id + '">' + table_values[i] + "</a>"
                    } else {
                        cell.innerHTML = table_values[i]
                    }
                    row.appendChild(cell)
                }
                table.appendChild(row)
            }

            // get static map image from google
            let static_url = "http://maps.googleapis.com/maps/api/staticmap"
            let params = {
                size: "400x300",
                markers: [
                    "color:red|" + browser
                ],
                sensor: false,
                key: "AIzaSyDTUSe7oemC70SFPtSAj_VMafkr8JvT4Po"
            }

            // add stations as markers to the map
            for (const station of Object.values(data)) {
                latlon = station.location.latitude + "," + station.location.longitude
                params.markers.push("color:blue|label:" + station.index + "|" + latlon)
            }

            // add map to the page
            let img_url = createURL(static_url, params)
            document.getElementById("mapholder").innerHTML = "<img src='" + img_url + "'>";

        });
    } else {
        console.log('geolocation not available');
    }

    let button = document.getElementById("geolocate");
    button.parentNode.removeChild(button);
}