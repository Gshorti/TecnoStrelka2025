import { HTTP_client } from "./services/httpClient.js";

let http = new HTTP_client();

window.onload = function() {
    http.getRoutes().then((res) => {
        console.log(` goida: ${res} `);
        if (!res) {
            console.log('GOIDA NET DERMO!!!')
            console.log('GOIDA NET DERMO!!!')
        }
        const routeElement = document.getElementById('route')
        routeElement.innerHTML = ''

        res.forEach((item) => {
            console.log(item.name)
            routeElement.innerHTML += `<li>${item.name}</li>`
        })
    })
}
