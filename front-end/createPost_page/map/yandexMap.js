ymaps.ready(init)
let map
let markers = []
let userCoords = []
let isCreatingNewPoint = false
let pageCoords = []

function init() {
    map = new ymaps.Map("map", {
        center: [0, 0],
        zoom: 10,
        controls: ['default', 'routeButtonControl'],
    })

    map.events.add('click', function (e) {
        console.log(e)
        const coords = e.get('coords')
        isCreatingNewPoint = true
        addMarker(coords)
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
}

function addMarker(coords) {
    console.log(pageCoords)
    isCreatingNewPoint = false
    let title = showNewPointOnRoute(pageCoords)

    if (title !== null) {
        const marker = new ymaps.Placemark(coords, {
            balloonContent: title
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        })

        map.geoObjects.add(marker)
        markers.push(coords)

        marker.events.add('click', function () {
            if (managePoint(pageCoords)) {
                map.geoObjects.remove(marker)
                markers = markers.filter(markerCoords => markerCoords !== coords)
            }
        })
    }
}
