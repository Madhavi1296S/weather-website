
//  const url ='https://api.darksky.net/forecast/9f937a5b9c1bf374bdfc5527da7ccb9e/37.8267,-122.4233'
//  request({url: url, json: true }, (error, response)=>{
//  if(error){
//      console.log('unable to connect to weather service')
//  }else if(response.body.error)
//  {
//        console.log('unable to find location')
//  }
 
//  else{
//     console.log(response.body.daily.data[0].summary + ' It is currently '+response.body.currently.temperature+' degrees out. There is a '+response.body.currently.precipProbability+'% chance of rain')
//  } 
// })



//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)



const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url= 'https://api.darksky.net/forecast/9f937a5b9c1bf374bdfc5527da7ccb9e/'+latitude+','+longitude
    
    request({url, json: true}, (error, {body}) => {
          if(error)
          {
               callback('Unable to connect to weather services!', undefined)
          } else if(body.error)
          {
                callback('unable to find location. try another search',undefined)
          } else{
               
                callback(undefined, body.daily.data[0].summary + ' It is currently '+body.currently.temperature+' degrees out. The high today is'+body.daily.data[0].temperatureHigh+'with a low of'+body.daily.data[0].temperatureLow+'. There is a '+body.currently.precipProbability+'% chance of rain')
                    // {
                    //   location: response.body.timezone,
                    //   summary:  response.body.daily.data[0].summary,
                    //   temperature: response.body.currently.temperature,
                    //   raininpercentage:response.body.currently.precipProbability})
          }
    })
}

module.exports = forecast

