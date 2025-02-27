import { coordinates } from '../getPostData.js'

ymaps.ready(init);

function init() {
    const map = new ymaps.Map("map", {
        zoom: 10,
        center: [0, 0],
    });

    if (coordinates && coordinates.length > 0) {
        coordinates.forEach(coord => {
            const placemark = new ymaps.Placemark(coord);
            map.geoObjects.add(placemark);
        });

        map.setCenter(coordinates[0]);
    } else {
        console.error('Координаты не найдены или пусты');
        console.log(`${coordinates}`)
    }
}
