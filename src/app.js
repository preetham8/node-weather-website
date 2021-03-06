const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup sttic directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Preetham Reddy'
    } )
})

app.get('/about',(req,res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Preetham Reddy'
    } )
})

app.get('/help', (req,res) => {
    res.render('help', {
        body : 'For anymore help, please connect with us',
        title : 'Help ',
        name : 'Preetham Reddy'
    })
})

let selectLatitude
let selectLongitude
let allWeathers = { }
let allLocations = [ ]


app.get('/forecast', (req,res) => {
    if(!req.query.address) {
        return res.send( {
            error : 'You must provide an Address'
        })
    }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send( {
                allData : allData,
                // forecast : forecastData,
                // location,
                // address : req.query.address
            })

        })
    })

    // res.send({
    //     forecast : 'sunny',
    //     location : 'nizamabad',
    //     address : req.query.address
    // })


app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send( {
            error : 'You must provide an Address'
        })
    }

    geocode(req.query.address , (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

            res.send( {
                allData : allData,
                // forecast : forecastData,
                // location,
                // address : req.query.address
            })
    })

    // res.send({
    //     forecast : 'sunny',
    //     location : 'nizamabad',
    //     address : req.query.address
    // })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send( {
            error : 'You must provide a Search term'
        })
    }

    console.log(req.query.search)
    res.send( {
        products : []
    })
})


app.get('/help/*', (req,res) => {
    res.render('404', {
        title : '404',
        name : 'Preetham Reddy',
        errorMesssage: 'Help Article not found.'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title : '404',
        name : 'Preetham Reddy',
        errorMesssage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port' + port)
})