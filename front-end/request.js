import { HTTP_client } from "./services/httpClient.js";

let http = new HTTP_client();

let mainDiv = document.getElementById('main-div')

function newTemplatePost(link, data) {
    const template = document.getElementById('post-template')
    const clone = document.importNode(template.content, true)
    clone.querySelector('.name-of-post').innerText = data.name
    clone.querySelector('img').src = link
    clone.querySelector('#systemData').innerText = data
    console.log(data)
    mainDiv.appendChild(clone)
}

function loadImage(data) {
    return data.image = String(data.image).replace('127.0.0.1:8001/', 'www.kringeproduction.ru/files/')
}

function postOnDocumentSetter(object, sysData) {
    let images = http.getImages()
    images.then((data) => {
        for (let i = 0; i < data.length; i++) {
            let img = data[i]
            if (img.id === object[0]) {
                img.image = loadImage(img)
                newTemplatePost(img.image, sysData)
                break
            }
        }
    })
}

function getPostsData() {
    http.getRoutes().then((res) => {
        res.forEach((item) => {
            console.log(item)
            postOnDocumentSetter(item.images, item)
        })

    }).catch((e) => {
        console.error(e)
    })
}

getPostsData()