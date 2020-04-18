console.log('Client Side JavaScript File Loaded!')
const forecast = require('../../utils/forecast')
const geocode = require('../../utils/geocode')

const address = 'Boston'

const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address)  + '.json?access_token=pk.eyJ1IjoiamF2aWVydHJldmlubyIsImEiOiJjajdzZzR3M2QxNzg5MnducW9lcmE5cjN5In0._VSib0HK3Jp0YNrhN0dn8A&limit=1'

fetch('http://puzzle.mead.io/puzzle').then((response) =>{
    response.json().then((data)=>{
        console.log(data)
    })
})

fetch(url).then((response) => {

    response.json().then((data) =>{
        if(data.features.length === 0) {
            console.log('there was an error');
        }
        console.log(data.features[0].place_name, data.feature[0].)
    }) 
})


if (!address) {
    console.log('provide a valid location')
} else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
        return console.log(error)
        } 

    forecast(latitude, longitude, (error, forecastData) => {

        if (error) {
            return console.log(error)
        }

        console.log(location)
        console.log(forecastData)

        })
    })
}


