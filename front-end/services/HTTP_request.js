export class HTTP_request {
    async get(url, headers) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
            });

            if (!response.ok) {
                return Promise.reject(response);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return Promise.reject(new Error(error.message));
        }
    }

    async post(url, body, headers) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: body, // body теперь может быть FormData
            });
    
            if (!response.ok) {
                return Promise.reject(response);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            return Promise.reject(new Error(error.message));
        }
    }    
}

// EXAMPLES

// CREATING http request object
// let http = new HTTP_request()

// HEADERS Template
// let headers = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
// }

// // DATA Template
// let data = {
//     'name': "qwerty",
//     'data': {},
//     'comments': [ 1 ],
//     'images': [ 1 ]
// }

// // POST request
// let post = http.post('https://www.kringeproduction.ru/routes/', data, headers)
// post.then((data) => {
//     console.log(data)
// })

// // GET request
// let get = http.get('https://www.kringeproduction.ru/routes/', headers)
// get.then((data) => {
//     console.log(data)
// })
