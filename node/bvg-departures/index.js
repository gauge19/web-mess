// import modules
const fetch = require("node-fetch");
const keys = require("./ressources/js/keys");
const express = require('express');
const fs = require('fs');
const utils = require('./ressources/js/utils');

async function getLocationViaGMAPS() {
    const maps_url = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + keys.google;
    const response = await fetch(maps_url, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return data;
}

// set up server
const app = express();
app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public')); // serve 'public' folder when accessing the server ('localhost:3000')
app.use('/departures', express.static('departure'));
app.set('views', './departure');
app.set('view engine', 'pug');
app.use(express.json({ limit: '1mb' })); // limit incoming files to 1mb

// send data
app.get('/location', async (request, response) => {
    const data = await getLocationViaGMAPS();
    response.json(data);
});

app.get('/departures/:id', async (request, response) => {
    const id = request.params.id
    const params = { results: 10 }
    //const url = utils.createURL('https://3.vbb.transport.rest/stops/' + id + '/departures', params)
    let url = 'https://3.vbb.transport.rest/stops/' + id

    let page_data = {}

    page_data["station_info"] = await (await fetch(url)).json()

    url = 'https://3.vbb.transport.rest/stops/' + id + '/departures'
    url = utils.createURL(url, { results: 10, duration: 30 })

    page_data["departures"] = await (await fetch(url)).json()

    response.render("departure", page_data)
});

app.get('/nearest/:latlon', async (request, response) => {
    latlon = request.params.latlon.split(",")
    //console.log("nearest station requested for location:", latlon)

    base_url = 'https://3.vbb.transport.rest/stops/nearby'
    params = {
        latitude: latlon[0],
        longitude: latlon[1],
        results: 8,
        distance: 500
    }
    nearest = await (await fetch(utils.createURL(base_url, params))).json()

    response.json(nearest)
})

// receive data
app.post('/api', (request, response) => {
    console.log(request.body);

    // send back a response to the client
    response.json({
        success: true,
        request: request.body
    })
    //response.end()
});
