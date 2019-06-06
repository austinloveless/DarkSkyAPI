const express = require('express');
const router = express.Router();
const axios = require('axios');

let nowUnix = Math.floor(Date.now()/1000);
let hourAgoUnix = Math.floor(Date.now()/1000) - 3600;

let apiUrl = process.env.APIURL || `https://api.darksky.net/forecast/abd6b9a3a3a391da0e1cbac33d52e1e8/39.7393,-104.9848,${hourAgoUnix}`;

function getAverage() {
    axios.get(apiUrl)
    .then(response =>  response.data.minutely.data)
    .then(response => lala(response))

    function lala(data) {
        let sum = 0
        let avg = 0
        
        for (i = 0; i < data.length; i++) {
            sum = sum + data[i]
            console.log(sum)
            avg = sum/data.length
        }

        if (avg === 0) {

        }
        else {

        }
    }
}

router.get('/', (req, res) => {
    axios.get(apiUrl)
    .then(response =>  response.data.minutely.data)
    .then(response =>  res.status(200).json({response}))

})

router.get('/lasthour', (req, res) => {
    axios.get(apiUrl)
    .then(response =>  response.data.minutely.data)
    .then(response => getAverage(response))

    function getAverage(data) {
        let precipProbabilitySum = 0
        let precipProbabilityAvg = 0

        let precipIntensitySum = 0
        let precipIntensityAvg = 0
        
        for (i = 0; i < data.length; i++) {
            precipProbabilitySum = precipProbabilitySum + data[i].precipProbability
            precipProbabilityAvg = precipProbabilitySum/data.length
        }

        if (precipProbabilityAvg === 0) {
            res.status(200).json({precipProbabilityAvg})
        }
        else {
            for (i = 0; i < data.length; i++) {
                precipIntensitySum = precipIntensitySum + data[i].precipIntensity
                precipIntensityAvg = precipIntensitySum/data.length
            }
            res.status(200).json({precipProbabilityAvg, precipIntensityAvg})
        }
    }

})

getAverage();




module.exports = router;