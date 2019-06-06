const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const weatherRoutes = require('./routes/weather')


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

app.use('/weather', weatherRoutes)

app.get('/', (req, res, next) => {
    res.status(200).json({message: 'i succeeded'})
    console.log('ello');
});

app.listen(port, () => {
    console.log(`I'm listening on ${port}`);

});


module.exports = app;