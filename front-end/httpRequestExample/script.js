// HTTP REQUEST EXAMPLE // 

import { HTTP_request } from '../services/HTTP_request.js' // IMPORT

document.getElementById('send-data').addEventListener('click', function() {
    // POST request example
    let http = new HTTP_request()    // CREATING http request

    let headers = { // SETTING http request headers
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    let data = {    // SETTING http request body
        'name': "qwerty",
        'data': {},
        'comments': [1],
        'images': [1]
    }

    let post = http.post('https://www.kringeproduction.ru/routes/', data, headers)  // SENDING http request
    post.then((data) => {  // GETTING http request output
        console.log(data)
    }).catch((err) => {
        console.error(JSON.stringify(err))
    })
})

document.getElementById('get-data').addEventListener('click', function() {
    // GET request example
    let http = new HTTP_request()   // CREATING http request
    
    let headers = {  // SETTING http request headers
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    let get = http.get('https://www.kringeproduction.ru/routes/', headers)  // SENDING http request
    get.then((data) => {    // GETTING http request output
        console.log(data)
        document.getElementById('data').textContent = 'DATA: ' + JSON.stringify(data)
    })
})
