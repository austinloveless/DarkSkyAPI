const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

// let apiUrl = process.env.APIURL || 'https://api.darksky.net/forecast/abd6b9a3a3a391da0e1cbac33d52e1e8/39.7393,-104.9848,2019-06-05T16:50:00'

let date = '2019-06-05';
let hour = '16';
let min = '50';
let sec = '00';

let apiUrl = process.env.APIURL || `https://api.darksky.net/forecast/abd6b9a3a3a391da0e1cbac33d52e1e8/39.7393,-104.9848,${date}T${hour}:${min}:${sec}`;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

// function  getDarkSkyData() {
//     axios.get('https://api.darksky.net/forecast/abd6b9a3a3a391da0e1cbac33d52e1e8/39.7393,104.9848,2019-06-05T15:30:00')
//     .then(response =>  console.log(response));
// }


app.get('/', (req, res, next) => {

    axios.get(apiUrl)
    .then(response =>  response.data)
    .then(response =>  res.status(200).json({response}));

    console.log('ello');

});

app.listen(port, () => {
    console.log(`I'm listening on ${port}`);
});


module.exports = app;