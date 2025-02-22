import { HTTP_client } from "./services/httpClient.js";

let http = new HTTP_client();

window.onload = function() {
    // Получение маршрутов
    http.getRoutes().then((res) => {
        if (!res) {
            console.log('Bad request');
            return;
        }

        let routeElement = document.getElementById('main-div');
        routeElement.innerHTML = ''; // Очищаем маршруты

        res.forEach((item) => {
            routeElement.innerHTML += `<div class="route-div">${item.name}</div>`
        });
    });

    http.getImages().then((res) => {
        if (!res) {
            console.log('Bad images request');
            return;
        }

        let imageElement = document.getElementById('images-or-route');
        imageElement.innerHTML = ''; // Очищаем предыдущие изображения

        res.forEach((item) => {
            console.log(item.image);

            let imageUrl = item.image.replace('127.0.0.1:8001/', 'www.kringeproduction.ru/files/');

            // Создаем новый div для изображения
            let imageDiv = document.createElement('div');
            imageDiv.className = 'image-div';

            // Создаем элемент img
            let imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = imageUrl;

            // Добавляем изображение в div
            imageDiv.appendChild(imgElement);

            // Добавляем div с изображением в основной контейнер
            imageElement.appendChild(imageDiv);
        });
    });
}
