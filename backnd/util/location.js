const axios = require('axios')
const HttpError = require('../models/http-error')
const API_KEY = 'AIzaSyCLqnpdnCa_hAifBiEG7fr36gXIEDWsizs'

async function getCoordinatesByAddress(address) {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)
    console.log(response);

    const data = response.data

    if (!data || data.status === 'ZERO_RESULTS') {
        console.log(data)
        const error = HttpError('Could not find location for given address', 422)
        throw error
    }

    const coordinates = data.results[0].geometry.location
    console.log(coordinates)

    return coordinates
}

module.exports = getCoordinatesByAddress