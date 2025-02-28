import {HTTP_client} from '../services/httpClient.js'

let http = new HTTP_client()

document.getElementById('create-route-button').addEventListener('click', async (e) => {
    let routeName = document.getElementById('route-name-input').value
    let routeDescription = document.getElementById('route-description-textarea').value
    let routePrivate = document.getElementById('route-availability-input').value
    let isPrivate = false

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
    if (markers === []) {
        showErrorPopup()
        return
    }

    let data = {
        "name": routeName,
        "description": routeDescription,
        "images": [],
        "data": JSON.stringify(markers),
        "private": Boolean(isPrivate),
    }

    sendImages(data)
})

function sendImages(OBJ) {
    http.postImages(filesArray).then(
        data => {
            console.log(data)
        }
    ).finally( output => {
        generateIndexOfImages(OBJ)
    })
}

function generateIndexOfImages(dataObject) {
    let imagesCount = filesArray.length
    let imagesIds = []
    http.getImagesCount().then(data => {
        let lastImg = data.at(-1).id
        for (let i = 0; i < imagesCount; i++) {
            imagesIds.push(Number(lastImg + i))
        }
        return imagesIds
    }).then(
        data => {
            dataObject.images = imagesIds
            dataObject.data = markers
            generatePost(dataObject)
        }
    )
}

function generatePost(dataObject) {
    http.postNewRoute(JSON.stringify(dataObject)).then((data) => {
        changeUserData(data)
    }).catch((err) => {
        console.error(err)
    })
}

function changeUserData(routeData) {
    let username = String(localStorage.getItem('username'))
    http.getUser(username).then((user) => {
        http.userCreatedARoute(routeData.id, user[0].id, user[0].email, user[0].routes).then((output) => {
            console.log(output)
        })
    })
}