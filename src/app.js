const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static folder to serve

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather ',
        name: 'Javier'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Her',
        name: 'Javier'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Get HR Support Now',
        title: 'Help',
        name: 'Javier'
    })
})


app.get('/weather', (req, res) => {

   if(!req.query.address) {
            return res.send({
                error: 'you need to provide an address '
            })
        }


    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{

       

        if(error) {
            return res.send({
                error
            })
        }
       
        forecast(latitude,longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecastData,
                location,
                address: req.query.address
                
            })
        })  

      
    })

    

})

app.get('/products', (req,res) => {


    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: 'Ups!',
        errorMessage: 'Article Was Not Found!',
        name: 'J & Co.'

    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page Not Found.',
        name: 'J & Co.'
    })
})

app.listen(port, () =>{
    console.log(`Server is up on port ${port}`)
})
