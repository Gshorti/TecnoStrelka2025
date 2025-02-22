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

function loadImage(data, imageId) {     /// USING IT
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === imageId) {
            data[i].image = String(data[i].image).replace('127.0.0.1:8001/', 'www.kringeproduction.ru/files/')
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

function postOnDocumentSetter(object) {             /// USING IT
    object.forEach((id) => {
        let images = http.getImages()
        images.then(data => {
            loadImage(data, id)
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

    let mainImage = localStorage.getItem('postMainImage')
    let postName = localStorage.getItem('postName')
    let postDescription = localStorage.getItem('postDescription')

    document.getElementById('main-image').src = mainImage
    document.getElementById('route-name').innerText = postName

    if (selectedPost) {
        let parsedPost = JSON.parse(selectedPost)
        console.log(parsedPost.description)
        document.getElementById('route-description').innerText = String(parsedPost.description)
        console.log(parsedPost)
        postOnDocumentSetter(parsedPost.images)
        commentsOnDocumentSetter(parsedPost.comments)
    }

    // TODO --end
}