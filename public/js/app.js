// console.log('Client side script has loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
    
// })


const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e)=>{
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    e.preventDefault()
    const location = address.value
    fetch('http://localhost:3000/weather?address='+address.value).then((response)=>{
    response.json().then((data)=>{
        if(!data.location){
            messageOne.textContent = data.error.toString()
            //console.log(data.error)
        }
        
        messageOne.textContent = data.location
        messageTwo.textContent = data.summary

        //console.log(data.location, data.summary)
    })
})
})