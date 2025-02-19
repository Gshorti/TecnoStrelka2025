import { HTTP_request } from "./HTTP_request.js";

window.onload = function() {
    let http = new HTTP_request();

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    let get = http.get('https://www.kringeproduction.ru/routes/', headers);
    get.then((data) => {
        console.log(data);

        document.getElementById('route').textContent = '';

        data.forEach((item) => {
            document.getElementById('route').textContent += item.name + '\n';
        });
    }).catch((error) => {
        console.error('апшипка: ', error);
        document.getElementById('route').textContent = 'тут апшипка эххххъ';
    });
};
