// HTTP REQUEST EXAMPLE // 

import { HTTP_request } from '../HTTP_request.js';

document.getElementById('cnopka').addEventListener('click', function() {
    console.log('click');
    let http = new HTTP_request();
    
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    let data = {
        'name': "qwerty",
        'data': {},
        'comments': [1],
        'images': [1]
    };

    let post = http.post('https://www.kringeproduction.ru/routes/', data, headers);
    post.then((data) => {
        console.log(data);
    })
})

document.getElementById('get-data').addEventListener('click', function() {
    let http = new HTTP_request();
    
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    let get = http.get('https://www.kringeproduction.ru/routes/', headers);
    get.then((data) => {
        console.log(data)
        document.getElementById('data').textContent = 'DATA: ' + JSON.stringify(data)
    })
})
