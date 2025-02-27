ymaps.ready(init)
let map = null
let markers = []
let userCoords = []
let isCreatingNewPoint = false
let pageCords = []
let exportButton = document.getElementById('export-map-by-geojson')



let geoJsonData = {
    type: "FeatureCollection",
    features: []
}

exportButton.addEventListener('click', function () {
    const geoJson = getGeoJSON(map)
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

        console.log("Добавление маркера с координатами:", coords)

        geoJsonData.features.push({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: coords,
            },
            properties: {
                balloonContent: 'point',
            }
        })

        console.log("Текущие данные GeoJSON:", geoJsonData)

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
        const geoJson = getGeoJSON(map)
        console.log(JSON.stringify(geoJson, null, 2))

    })

}

async function addMarker(coords, pageCords) {
    const title = await showNewPointOnRoute(pageCords)

    if (title === null) {
        return
    }

    const marker = new ymaps.Placemark(coords, {
        balloonContent: title
    }, {
        preset: 'islands#icon',
        iconColor: '#0095b6'
    })

    map.geoObjects.add(marker)
    markers.push(coords)

    marker.events.add('click', async () => {
        const pointIsDel = await managePoint(pageCords, marker.properties.get('balloonContent'))    /// Захар, убери показ текста метки
        if (pointIsDel) {
            map.geoObjects.remove(marker)
            markers = markers.filter(markerCoords => markerCoords !== coords)
            geoJsonData.features = geoJsonData.features.filter(feature => feature.geometry.coordinates.toString() !== coords.toString())
        }
    })
}

function getGeoJSON(map) {

    if (!map) {
        return console.error('Map is not loaded')
    }

    const features = []

    console.log(map.geoObjects)

    map.geoObjects.each(function (geoObject) {
        let geometryType = null
        let coordinates = null

        if (geoObject.geometry) {
            if (geoObject.geometry.getType() === "Point") {
                geometryType = "Point"
                coordinates = geoObject.geometry.getCoordinates()
            } else if (geoObject.geometry.getType() === "LineString") {
                geometryType = "LineString"
                coordinates = geoObject.geometry.getCoordinates()
            } else if (geoObject.geometry.getType() === "Polygon") {
                geometryType = "Polygon"
                coordinates = geoObject.geometry.getCoordinates()
            }
        }

        if (geometryType && coordinates) {
            features.push({
                type: "Feature",
                geometry: {
                    type: geometryType,
                    coordinates: coordinates
                },
                properties: geoObject.properties.getAll() || {}
            })
        }
    })

    return {
        type: "FeatureCollection",
        features: features
    }
}
