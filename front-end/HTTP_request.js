class HTTP_request {
    allPostURL = ''

    constructor() {
    }

    async get(url) {
        let output = {}
        
        await fetch(url, {
            method: 'get',
            headers: headers,
        }).then(response => response.json())
          .then(data => output = data)
          .catch(error => output = new Error(error))

        return output
    }

    async post(url, body, headers) {
        let output = {}
        
        await fetch(url, {
            method: "post",
            headers: headers,
            body: JSON.stringify(body)
        }).then(
            data => output = data
        ).catch(
            error => output = new Error(error)
        )
        return output
    }
}

let http = new HTTP_request()

// HEADERS Template
let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

// DATA Template
// let data = {
//     'name': "qwerty",
//     'data': {},
//     'comments': [ 1 ],
//     'images': [ 1 ]
// }

// POST request
// let post = http.post('https://www.kringeproduction.ru/routes/', data, headers)
// post.then((data) => {
//     console.log(data)
// })

// GET request
// let get = http.get('https://www.kringeproduction.ru/routes/', headers)
// get.then((data) => {
//     console.log(data)
// })
