import {HTTP_client} from '../../services/httpClient.js'

let http = new HTTP_client()

let mainDiv = document.getElementById('main-div')

function newTemplatePost(link, data) {
    const template = document.getElementById('post-template')
    const clone = document.importNode(template.content, true)
    clone.querySelector('.name-of-post').innerText = data.name
    clone.querySelector('img').src = link
    clone.querySelector('#systemData').innerText = JSON.stringify(data)
    mainDiv.appendChild(clone)
}

function loadImage(data) {
    return data.image = String(data.image).replace('127.0.0.1:8001/', 'www.kringeproduction.ru/files/')
}

function postOnDocumentSetter(ids, postData) {
    http.getImages(ids).then((data) => {
        let temp = loadImage(data[0])
        newTemplatePost(temp, postData)
    })
}

function getPostsData() {
    let username = localStorage.getItem('username')
    http.getUserRoutes(username).then((res) => {
        res.routes.forEach((item) => {
            http.getRoute(item).then((data) => {
                postOnDocumentSetter(data.images, data)
            })
        })
    }).catch((e) => {
        console.error(e)
    })
}

getPostsData()