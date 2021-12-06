const request = require('request')

const forecast = (lat, lag, callback ) =>{

    const url = 'http://api.weatherstack.com/current?access_key=a693576b165d549621c06ac30a8cc3e1&query='+lat+','+lag

    //console.log(url)
    request({url, json:true }, (error, {body}) =>{
        if (error){
            callback('unbale to connect to location services', undefined)
                }
         
                
        else {
            callback(undefined,{
                temp:  body.current.temperature,
                desc:  body.current.weather_descriptions[0]
            })
            
    }
    
})}

module.exports = forecast

