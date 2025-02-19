import { HTTP_client } from '../services/httpClient.js';

let http = new HTTP_client();

document.getElementById('create-route-button').addEventListener('click', async (e) => {
    filesArray.forEach((file) => {
        http.postImage(file).then((data) => {
            console.log(data)
        })
    })
});
