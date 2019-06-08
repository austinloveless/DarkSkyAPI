const express = require('express');
const router = express.Router();
const axios = require('axios');

let nowUnix = Math.floor(Date.now()/1000);
let hourAgoUnix = Math.floor(Date.now()/1000) - 3600;
let dayAgoUnix = Math.floor(Date.now()/1000) - 86400;

let apiUrl = process.env.APIURL || `https://api.darksky.net/forecast/abd6b9a3a3a391da0e1cbac33d52e1e8/39.7393,-104.9848,${hourAgoUnix}`;

let dayAgoApiUrl = process.env.APIURL || `https://api.darksky.net/forecast/abd6b9a3a3a391da0e1cbac33d52e1e8/39.7393,-104.9848,${dayAgoUnix}`;

router.get('/', (req, res) => {
    axios.get(apiUrl)
    .then(response =>  response.data.minutely.data)
    .then(response =>  console.log(response))
    .then(response =>  res.status(200).json({response}))

})

router.get('/lasthour', (req, res) => {
    axios.get(apiUrl)
    .then(response =>  response.data.minutely.data)
    .then(lasthour => getAverage(lasthour))    

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

router.get('/last24hours', (req, res) => {
    axios.get(dayAgoApiUrl)
    .then(response =>  response.data.hourly.data)
    .then(response =>  getAverage(response))  

    function getAverage(data) {

        let tempSum= 0
        let averageTempurature = 0
       
        for (i = 0; i < data.length; i++) {
            tempSum = tempSum + data[i].temperature
            averageTempurature = tempSum/data.length
        }
        res.status(200).json({averageTempurature})
    }

})


module.exports = router;