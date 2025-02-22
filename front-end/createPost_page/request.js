import {HTTP_client} from '../services/httpClient.js';

let http = new HTTP_client();

document.getElementById('create-route-button').addEventListener('click', async (e) => {
    let imagesId = []
    filesArray.forEach((file) => {
        http.postImage(file).then((data) => {
            imagesId.push(data.id)
        })
    })

    generatePost(imagesId)
})

function generatePost(imagesOnPostID) {

    let routeName = document.getElementById('route-name-input').value
    let routeDescription = document.getElementById('route-description-textarea').value
    // let routeData = document TODO
    //                           Захар должен Yandex Map API сделать!!!!

    if (routeName === null || routeName === '') {
        showErrorPopup()
        return
    }
    if (routeDescription === null || routeDescription === '') {
        showErrorPopup()
        return
    }
    if (imagesOnPostID === []) {
        showErrorPopup()
        return
    }

    console.log(imagesOnPostID)

    let object = {
        "name": routeName,
        "data": {},
        "comments": [],
        "images": imagesOnPostID
    }

    http.postRoutes(JSON.stringify(object)).then((data) => {
        console.log(data)
    })
}