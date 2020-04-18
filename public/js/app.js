const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  const url = `/weather?address=${location}`

  messageOne.textContent = 'Loading'
  messageTwo.textContent = ''



  fetch(url).then((response) => {
    response.json().then((data) =>{
        if(data.error) {
          console.log(data.error);
          messageOne.textContent = `${data.error}`

        } else {
          messageOne.textContent = `${data.location}`
          messageTwo.textContent = `${data.forecastData}`
           console.log(`${data.forecastData} in ${data.location}`)

        }
    }) 
})



  //console.log(location)
})