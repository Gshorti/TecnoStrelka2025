import { HTTP_client } from "./services/httpClient.js";

let http = new HTTP_client();

window.onload = function() {
    http.getRoutes().then((res) => {
        if (!res) {
            console.log('Bad request');
        }
        const routeElement = document.getElementById('main-div')
        routeElement.innerHTML = ''

        res.forEach((item) => {
            console.log(item.name)
            routeElement.innerHTML += `<div class="route-div">${item.name}</div>`
        })
    })
}
