
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname) /// directory name
// console.log(path.join(__dirname,'../public'))



const app = express()

const port = process.env.PORT || 3000 //// for heroku

// define path for express config
const publiccdir = path.join(__dirname,'../public')
const viewsdir = path.join(__dirname,'../templates/views') // if folders is different that views
const partials = path.join(__dirname,'../templates/partialviews')

// set up handlebars engine and view location
app.set('view engine','hbs') // handlebar
app.set('views', viewsdir) // set foldername for views
hbs.registerPartials(partials)

// setup static directory to serve
app.use(express.static(path.join(publiccdir))) // way to customise server

// app.get('',(req, response) =>{
//     response.send('<h1>Hello express</h1>')
// })

// app.get('/help',(req, res)=>{
//     res.send({
//         name: 'ashwini'
//     })
// })

// app.get('/about',(req, res)=>{
//     res.send('about')
// })

app.get('',(req, res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'ashwini'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'about',
        name: 'ashwini'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'help',
        message: 'this is sample',
        name: 'ashwini'
    })
})

app.get('/weather', (req, res)=>{ 
    if (!req.query.address){
        return res.send({
            error: 'Please provide address'
        })
    }
   
        //address: req.query.address,
       geocode(req.query.address, (error, {latitude, longitude, location} ={}) =>{
           if (error){
               return res.send({error})
               console.log(error)
           }

           forecast(latitude, longitude, (error, forecastdat) =>{
               if (error){
                   return res.send({error})
               }

               res.send({
                   latitude,
                   forecast: forecastdat,
                   location,
                   address: req.query.address
               })
           })
       })

   
})

app.get('*', (req, res)=>{
    res.render('404',{
        message: 'Page not found',
        title:'404'

    })
})

app.listen(port, ()=>{
    console.log('server is up on port '+ port)
})

