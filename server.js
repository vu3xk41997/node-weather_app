if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
const express = require('express')
const axios = require('axios')

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/weather', function(req, res) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longtitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data))
})

app.listen(3030, function() {
    console.log('Server started...')
})