const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('x-powered-by', true)
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ronson Xaviour'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Ronson Xaviour'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        email: 'ronson898@gmail.com',
        name: 'Ronson Xaviour'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            code: 400,
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                code: 500,
                error: error
            })
        }
        forecast(data, (error, data) => {
            if (error) {
                return res.send({
                    code: 500,
                    error: error
                })
            }
            res.send({
                location: data.location,
                summary: data.summary,
                temperature: data.temperature,
                precipProbability: data.precipProbability
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            code: 400,
            message: 'You must send a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: 'Page not found',
        message: 'Help articlet that you are looking for is not found'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: 'Page not found',
        message: 'Page you are looking for is not found'
    })
})

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})