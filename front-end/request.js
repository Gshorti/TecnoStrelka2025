import { HTTP_client } from "./services/httpClient.js";

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
    return data.image = http.imagePipe(data.image)
}

function postOnDocumentSetter(object, sysData) {
    http.getImages(object).then((data) => {
        let temp = loadImage(data[0])
        newTemplatePost(temp, sysData)
    })
}

function getPostsData() {

    // TODO
    //  CHECK IF WORK CORRECT:

    http.getRoutes().then(
        res => {
            res.forEach((item) => {
                postOnDocumentSetter(item.images, item)
            })
        }
    ).catch((e) => {
        console.error(e)
    })
}

getPostsData()