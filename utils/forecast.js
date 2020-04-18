const request = require('request')

const forecast = (latitude, longitude, callback) => {
   
   
    const url = `http://api.weatherstack.com/current?access_key=71efd6e8da55c314ef2e5008aaac6251&query=${latitude},${longitude}`

    request( { url, json: true}, (error, { body } = {} ) => {
        if(error) {
            callback('unable to connect to the network')
        } else if (body.info) {
            callback("Not a valid location")
        } else{
            callback(undefined,  body.current.weather_descriptions[0] + ' outside and It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain. ' + 'this forecast was generated at ' + body.current.observation_time )
        }
    })
}

module.exports = forecast