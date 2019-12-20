const path = require('path')
const express = require('express')
const hbs= require('hbs')


const geocode = require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup ststic directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Madhavi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Madhavi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Madhavi'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
      return  res.send({
            error:'you must provide an address'
        })
        
     }
     geocode(address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
             return res.send(error)
        }
    forecast(latitude, longitude, (error, forecastdata) => {
          if(error){
                return res.send(error)
          }
          res.send({
            forecast: forecastdata,
            location,
            address:req.query.address
        
        })
       
     })
  })

    
})


app.get('/products',(req,res) => {
if(!req.query.search){
    res.send({
        error:'you must provide a search term'
    })
}

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Madhavi',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Madhavi',
        errorMessage: 'page not found'
    })

})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})