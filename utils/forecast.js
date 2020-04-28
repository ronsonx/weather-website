const request = require('request')
const DARK_SKY_API_KEY = process.env.DARK_SKY_API_KEY
const forecast = ({latitude,longitude,location}, callback)=>{
    const url = 'https://api.darksky.net/forecast/'+DARK_SKY_API_KEY+'/'+latitude+','+longitude+'?units=si&lang=en'
    request({url:url, json:true},(error, {body})=>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error){
            callback(body.error, undefined)
        }else{
            callback(undefined, {
                location: location,summary: body.daily.data[0].summary, 
                temperature:body.currently.temperature, 
                precipProbability:body.currently.precipProbability,
                temperatureHigh: body.daily.data[0].temperatureMax,
                temperatureLow: body.daily.data[0].temperatureMin
            })
            //console.log(body)
        }
    })
}

module.exports = forecast