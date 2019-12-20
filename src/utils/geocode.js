const request = require('request')

const geocode = (address, callback) => {
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FpbmltYWRoYXZpIiwiYSI6ImNrNDJoM281bTAwYzAzbXBiNTdqcGYyaTgifQ.6bn_FKv3pcWRJNdswZjiNQ&limit=1' 
    
    request({url, json: true}, (error, {body}) => {
          if(error)
          {
               callback('Unable to connect to location services!', undefined)
          } else if(body.features.length === 0)
          {
                callback('unable to find location. try another search',undefined)
          } else{
                callback(undefined, {
                      latitude: body.features[0].center[1],
                      longitude:body.features[0].center[0],
                      location:body.features[0].place_name
                })
          }
    })
}

module.exports = geocode






 //goal : print the lat/long for Los Angeles
 //1. Fire off a new request to the url explored in browser
 //2. have the request module parse it as JSON
 //3. print both the latitude and longitude to the terminal
 
//goal: Handle errors for geocoding request
//1. setup an error handler for low-level errors
//2. test by disacling network request and running the app
//3.setup error handling for no matching results
//4. test by altering the search term and running the app


//  const geocodeURL ='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2FpbmltYWRoYXZpIiwiYSI6ImNrNDJoM281bTAwYzAzbXBiNTdqcGYyaTgifQ.6bn_FKv3pcWRJNdswZjiNQ&limit=1'

//  request({url: geocodeURL, json: true }, (error, response)=>{
//     if(error){
//              console.log('unable to connect to weather service')
//          }//else if(response.body.message)(only .json is removed)
//          else if(response.body.features.length ===0)
//          {
//                console.log('Location not found. try another search')
//          }
         
//          else{
//             const latitude =response.body.features[0].center[1]
//     const longitude =response.body.features[0].center[0]
//     console.log(latitude, longitude)
//          } 
    
//  })