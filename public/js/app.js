

//console.log('client side javascript running')



const weatherform = document.querySelector('form')
const searchelement = document.querySelector('input')
const message_one = document.querySelector('#message-1')
const message_two = document.querySelector('#message-2')

//message_one.textContent = ''

weatherform.addEventListener('submit',(e) =>{
    e.preventDefault()

    const locationname = searchelement.value
    console.log(locationname)

    message_one.textContent='Loading....'
    message_two.textContent=''

    fetch('/weather?address='+ locationname).then((response) => {
    console.log(response)
    response.json().then((data) => {
        if (data.error) {
            message_one.textContent = data.error
            console.log(data.error)
            
        } else {
            console.log(data.location)
            console.log(data.forecast)
            message_one.textContent = data.location
            message_two.textContent = data.forecast
        }
    })
})
    //console.log('testing')
})

