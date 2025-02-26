import {HTTP_client} from '../services/httpClient.js'

let http = new HTTP_client()

document.getElementById('create-route-button').addEventListener('click', async (e) => {
    let routeName = document.getElementById('route-name-input').value
    let routeDescription = document.getElementById('route-description-textarea').value
    let routePrivate = document.getElementById('route-availability-input').value
    let isPrivate = false


    let routeData = document.getElementById('map').value

    let geoJsonData = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "LineString", // Тип геометрии, например, LineString для маршрута
                    coordinates: [
                        [102.0, 0.5],
                        [103.0, 0.5],
                        [104.0, 0.5]
                    ]
                },
                properties: {
                    name: routeName,
                    description: routeDescription
                }
            }
        ]
    };

    //                           Захар должен Yandex Map API сделать!!!!

    if (routeName === null || routeName === '') {
        showErrorPopup()
        return
    }
    if (routeDescription === null || routeDescription === '') {
        showErrorPopup()
        return
    }
    if (filesArray === []) {
        showErrorPopup()
        return
    }
    if (routePrivate === 'Общедоступный') {
        isPrivate = false
    } else {
        isPrivate = true
    }

    //let comments = [] Первоночально при создании маршрута комментариев к нему быть не должно их нужн одобавлять потом.

    let data = {
        "name": routeName,
        "description": routeDescription,
        "images": [],
        "data": JSON.stringify({"data": 'YandexAPI_Data'}),
        "private": isPrivate, //Тут должен быть бул
    }

    sendImages()
    generateIndexOfImages(data)
})

function sendImages() {
    http.postImages(filesArray).then(
        data => {
            console.log(data)
        }
    )
}

function generateIndexOfImages(dataObject) {
    let imagesCount = filesArray.length
    http.getImages().then(data => {
        let imagesIds = []
        let lastImg = data.at(-1).id
        for (let i = 0; i < imagesCount; i++) {
            imagesIds.push(Number(lastImg + 1))
        }
        return imagesIds
    }).then(
        data => {
            dataObject.images = data
            generatePost(dataObject)
        }
    )
}



function generatePost(dataObject) {
    console.log(dataObject)

    http.postNewRoute(JSON.stringify(dataObject)).then((data) => {
        console.log(data)
    }).catch((err) => console.error(err))
}