ymaps.ready(init)
let map
let markers = []
let userCoords = []
let isCreatingNewPoint = false
let pageCords = []
let exportButton = document.getElementById('export-map-by-geojson')

let geoJsonData = {
    type: "FeatureCollection",
    features: []
};

exportButton.addEventListener('click', function () {
    const geoJson = getGeoJSON(map);
    console.log(geoJson);
})

function init() {
    map = new ymaps.Map("map", {
        center: [0, 0],
        zoom: 10,
        controls: ['default', 'routeButtonControl'],
    })

    map.events.add('click', function (e) {
        const pageX = e.get('pagePixels')[0]
        const pageY = e.get('pagePixels')[1]
        const coords = e.get('coords')
        isCreatingNewPoint = true

        console.log("Добавление маркера с координатамиъ:", coords);

        geoJsonData.features.push({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: coords,
            },
            properties: {
                balloonContent: 'point',
            }
        });

        console.log("Текущие данные гойдаДЖСОН:", geoJsonData);

        addMarker(coords, [pageX, pageY])
    })

    ymaps.geolocation.get().then(function (res) {
        userCoords = res.geoObjects.position
        map.panTo(userCoords)

        var mapContainer = $('#map'),
            bounds = res.geoObjects.get(0).properties.get('boundedBy'),
            mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [mapContainer.width(), mapContainer.height()]
            )
        createMap(mapState)
    }, function (e) {
        createMap({
            center: userCoords,
            zoom: 2
        })
    })

    document.getElementById('export-map-by-geojson').addEventListener('click', function () {
        const geoJson = getGeoJSON(map);
        console.log(JSON.stringify(geoJson, null, 2));
    });

}

function addMarker(coords, pageCords) {
    isCreatingNewPoint = false
    let title = showNewPointOnRoute(pageCords) /// через промисы

    const marker = new ymaps.Placemark(coords, {
        balloonContent: title
    }, {
        preset: 'islands#icon',
        iconColor: '#0095b6'
    })

    map.geoObjects.add(marker)
    markers.push(coords)

    if (title === null) {
        map.geoObjects.remove(marker)
    }

    marker.events.add('click', function () {
        let pointIsDel = managePoint(pageCords)
        console.log(pointIsDel)     /// Сделать через промисы
        if (pointIsDel) {
            map.geoObjects.remove(marker)
            markers = markers.filter(markerCoords => markerCoords !== coords)
            geoJsonData.features = geoJsonData.features.filter(feature => feature.geometry.coordinates.toString() !== coords.toString());
        }
    })
}

function getGeoJSON(map) {
    const features = [];

    map.geoObjects.each(function (geoObject) {
        const geometry = geoObject.geometry;
        const properties = geoObject.properties;

        features.push({
            type: "Feature",
            geometry: {
                type: geometry.type,
                coordinates: geometry.coordinates
            },
            properties: {
                balloonContent: properties.balloonContent
            }
        });
    });

    return {
        type: "FeatureCollection",
        features: features
    };
}