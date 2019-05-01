const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e)=>{
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    e.preventDefault()
    const location = address.value
    fetch('/weather?address='+address.value).then((response)=>{
    response.json().then((data)=>{
        if(!data.location){
            messageOne.textContent = data.error.toString()
            //console.log(data.error)
        }
        
        messageOne.textContent = data.location
        messageTwo.textContent = data.summary + ' Normal temperature is ' + data.temperature + ' degree celcius. Highest temperature today is '+data.temperatureHigh+' degree celcius and lowest is '+data.temperatureLow+' degree celcius'

        //console.log(data.location, data.summary)
    })
})
})