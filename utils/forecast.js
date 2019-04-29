const request = require('request')
const forecast = ({latitude,longitude,location}, callback)=>{
    const url = 'https://api.darksky.net/forecast/68ad2397b37f00942c01e1852272f5da/'+latitude+','+longitude+'?units=si&lang=en'
    request({url:url, json:true},(error, {body})=>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error){
            callback(body.error, undefined)
        }else{
            callback(undefined, {location: location,summary: body.daily.data[0].summary, temperature:body.currently.temperature, precipProbability:body.currently.precipProbability})
        }
    })
}

module.exports = forecast