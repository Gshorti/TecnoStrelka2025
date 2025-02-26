ymaps.ready(init)
let map
let markers = []
let userCoords = []
let isCreatingNewPoint = false
let pageCords = []

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
        }
    })
}
