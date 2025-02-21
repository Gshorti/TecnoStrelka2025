import {HTTP_client} from '../services/httpClient.js'

let http = new HTTP_client()

function newTemplateImage(link) {
    const template = document.getElementById('image-template')
    const clone = document.importNode(template.content, true)
    clone.querySelector('img').src = link
    document.getElementById('route-images-container').appendChild(clone)
}

function newTemplateComment(name, text, likes) {
    const template = document.getElementById('comment-template')
    const clone = document.importNode(template.content, true)
    clone.querySelector('#user-name').innerText = name
    clone.querySelector('#comment-text').innerText = text

    let stars = clone.querySelectorAll('.rating-star')

    for (let i = 0; i < likes; i++) {
        stars[i].src = '../static/img/ratedStar.svg'
    }

    document.getElementById('rating-of-route-container').appendChild(clone)
}

function loadImage(data, imageId, imagesArray) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === imageId && imagesArray.indexOf(imageId) !== 0) {
            data[i].image = String(data[i].image).replace('127.0.0.1:8001/', 'www.kringeproduction.ru/files/')
            newTemplateImage(data[i].image)
        } else if (data[i].id === imageId && imagesArray.indexOf(imageId) === 0) {
            data[i].image = String(data[i].image).replace('127.0.0.1:8001/', 'www.kringeproduction.ru/files/')
            document.getElementById('main-image').src = data[i].image
            newTemplateImage(data[i].image)
        }
    }
}

function loadComment(data, commentId) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === commentId) {
            newTemplateComment(data[i].name, data[i].text, data[i].like)
        }
    }
}

function postOnDocumentSetter(object) {
    object.forEach((id) => {
        let images = http.getImages()
        images.then(data => {
            loadImage(data, id, object)
        })
    })
}

function commentsOnDocumentSetter(object) {
    object.forEach((id) => {
        let comment = http.getComments()
        comment.then(data => {
            loadComment(data, id)
        })
    })
}

window.onload = function () {
    // TODO
    //  Захар обязан сделать отправку с главной страницы

    let selectedPost = localStorage.getItem('selectedPost')
    let object = {
        "id": 1,
        "name": "fdfdf",
        "data": {},
        "comments": [1, 2, 3, 4],
        "images": [1, 8]
    }
    localStorage.setItem('selectedPost', JSON.stringify(object))
    if (selectedPost) {
        let parsedPost = JSON.parse(selectedPost)
        postOnDocumentSetter(parsedPost.images)
        commentsOnDocumentSetter(parsedPost.comments)
    }

    // TODO --end
}