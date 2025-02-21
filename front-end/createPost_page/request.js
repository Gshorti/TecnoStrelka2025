import {HTTP_client} from '../services/httpClient.js';

let http = new HTTP_client();

document.getElementById('create-route-button').addEventListener('click', async (e) => {
    let routeName = document.getElementById('route-name-input').value
    let routeDescription = document.getElementById('route-description-textarea').value
    let routePrivate = document.getElementById('route-availability-input').value
    let isPrivate = false


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
    if (filesArray === []) {
        showErrorPopup()
        return
    }
    if (routePrivate === 'Общедоступный') {
        isPrivate = false
    } else {
        isPrivate = true
    }

    let dataObject = {}
    generateIndexOfImages(dataObject)
    
    //let comments = [] Первоночально при создании маршрута комментариев к нему быть не должно их нужн одобавлять потом. 

    let data = JSON.stringify({
        "name": routeName,
        "description": routeDescription,
        "images": dataObject.images,
        "data": JSON.stringify({"data": 'YandexAPI_Data'}),
        "private": isPrivate, //Тут должен быть бул
    })
        generatePost(data)
   
})

function generateIndexOfImages(dataObject) {
    http.postImages(filesArray).then(
        data => {
            let ids = []
            for (let i = 0; i < data.length; i++) {
                data[i].then(val => {
                    ids.push(val.id)
                })
            }
            console.log("ids: "+ids)
            return ids
        }
    ).then(
        value => {
            dataObject.images = value
            console.log("dataobj" + dataObject)
        }
    )
}



function generatePost(dataObject) {
    console.log(dataObject)

    http.postNewRoute(dataObject).then((data) => {
        console.log(data)
    }).catch((err) => console.error(err))
}