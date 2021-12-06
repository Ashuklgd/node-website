const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYXNodWtsZ2QiLCJhIjoiY2t3ZzI2aDZ4MGtmNDMxdXRvd3o0MGI0eCJ9.U10Av4aOegk2Ji3VFZI3GA'
//console.log(url)
request({url, json:true}, (error, {body}) => {
    if (error){
        callback('unbale to connect to location services', undefined)
    }
    else if (body.features.lenght === 0){
        callback('unable to find location, try to search another location', ubdefined)
    }
    else {
        callback(undefined, {
            latitude: body.features[0].center[0], 
            longitude: body.features[0].center[1],
            location: body.features[0].place_name
        })
    }

}
)
}


module.exports = geocode