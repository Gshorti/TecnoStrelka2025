ymaps.ready(init);
let map;
let markers = [];

function init() {
    map = new ymaps.Map("map", {
        center: [55.751574, 37.573856], // Москва
        zoom: 10,
        controls: ['default', 'routeButtonControl'],
    });

    map.events.add('click', function (e) {
        const coords = e.get('coords');
        addMarker(coords);
        // drawRoute(markers);
    });
}

function addMarker(coords) {
    const title = prompt("Введите название для метки:");

    const marker = new ymaps.Placemark(coords, {
        balloonContent: title
    }, {
        preset: 'islands#icon',
        iconColor: '#0095b6'
    });

    map.geoObjects.add(marker);
    markers.push(coords);
}


// function addMarker(coords) {
//     const marker = new ymaps.Placemark(coords, {}, {
//         preset: 'islands#icon',
//         iconColor: '#0095b6'
//     });
//
//     map.geoObjects.add(marker);
//     markers.push(coords);
// } variant without names
