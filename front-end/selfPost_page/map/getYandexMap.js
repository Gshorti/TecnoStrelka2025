let cords = []

function coordinatesHandler(coordinates) {
    cords = coordinates
    console.log(cords)
    ymaps.ready(init)
}

function init() {
    let map = new ymaps.Map("map", {
        zoom: 11,
        center: [0, 0],
    }),
        path = new ymaps.GeoObject({
            geometry: {
                type: "LineString",
                coordinates: cords
            }
        })
    map.geoObjects.add(path)
    map.panTo(cords[0])
}
