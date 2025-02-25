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
    });

    ymaps.geolocation.get().then(function (res) {
        var mapContainer = $('#map'),
            bounds = res.geoObjects.get(0).properties.get('boundedBy'),
            mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [mapContainer.width(), mapContainer.height()]
            );
        createMap(mapState);
    }, function (e) {
        createMap({
            center: [55.751574, 37.573856],
            zoom: 2
        });
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

    marker.events.add('click', function () {
        if (confirm("Вы хотите удалить эту метку?")) {
            map.geoObjects.remove(marker);
            // Также можно удалить координаты из массива markers, если это необходимо
            markers = markers.filter(markerCoords => markerCoords !== coords);
        }
    });

    map.geoObjects.add(marker);
    markers.push(coords);
}
