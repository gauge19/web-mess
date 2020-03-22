// import modules
const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const fetch = require("node-fetch");

const fs = require('fs');
const utils = require('./utils');

// set up server
const app = express();
app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public')); // serve 'public' folder when accessing the server ('localhost:3000')
//app.set('views', './departure');
//app.set('view engine', 'pug');
app.use(express.json({ limit: '1mb' })); // limit incoming files to 1mb

const base_url = "https://www.futwiz.com";

app.get('/search', (req, res) => {
    console.log(req.query);

    const url = "https://www.futwiz.com/en/fifa20/career-mode/players";
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            //console.log(html);
            const $ = cheerio.load(html);

            const table = $(".playersearchresults"); // table object
            const tr_list = table.find('.table-row'); // get all table row objects except the header (1st) row

            let players = [];

            // fetch player data for each row (excluding header-row)
            tr_list.each((i, elem_tr) => {
                const td_list = $(elem_tr).children() // list of all td items of this row

                // retrieve data
                const player = {
                    name: td_list.eq(1).find('b').text(),
                    player_link: base_url + td_list.eq(1).find('a').attr('href'),
                    team: td_list.eq(1).find('p.team').text().split(" | ")[0].trimLeft(),
                    league: td_list.eq(1).find('p.team').text().split(" | ")[1].trimRight(),

                    face_img: base_url + td_list.eq(0).find('img.player-img').attr('src'),
                    club_img: base_url + td_list.eq(1).find('img.club').attr('src'),
                    nation_img: base_url + td_list.eq(1).find('img.nation').attr('src'),

                    overall: parseInt(td_list.eq(2).find('.highestbarcolour').text()),
                    potential: parseInt(td_list.eq(3).find('.highestbarcolour').text()),
                    position: td_list.eq(4).text().trim(),
                    age: parseInt(td_list.eq(6).text().trim()),
                    contract: parseInt(td_list.eq(7).text().trim()),
                    skill_moves: parseInt(td_list.eq(8).find('.starRating').text().trim()),
                    weak_foot: parseInt(td_list.eq(9).find('.starRating').text().trim()),
                    work_rate: {
                        offensive: td_list.eq(10).children().first().children().eq(0).text(),
                        defensive: td_list.eq(10).children().first().children().eq(1).text(),
                    },
                    foot: td_list.eq(11).text().trim(),
                    total_stats: parseInt(td_list.eq(12).text().trim().replace(/,/g, "")),
                }

                players.push(player);
            });

            res.json(players);

        };
    });

});

function print() {
    let output = "";
    for (let i = 0; i < arguments.length; i++) {
        output += "'" + arguments[i] + "' ";
    }

    console.log(output);
}