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
    const marker = new ymaps.Placemark(coords, {}, {
        preset: 'islands#icon',
        iconColor: '#0095b6'
    });

    map.geoObjects.add(marker);
    markers.push(coords);
}

// function drawRoute(coordsArray) {
//     if (coordsArray.length < 2) {
//         return;
//     }
//
//     ymaps.route(coordsArray).then(function (route) {
//         map.geoObjects.add(route);
//         map.setBounds(route.getBounds(), {checkZoomRange: true});
//     }, function (error) {
//         alert('Ошибка построения маршрута: ' + error.message);
//     });
// }


