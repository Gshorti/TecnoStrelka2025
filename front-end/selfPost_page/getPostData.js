import {HTTP_client} from '../services/httpClient.js'

let http = new HTTP_client()
let postComments = []
let routeId = 0


document.querySelector('.make-reaction').addEventListener('click', () => {

    let username = String(localStorage.getItem('username'))
    let likes = currentStarsValue
    let text = document.querySelector('.text-of-reaction').value

    let comment = {
        'name': username,
        'text': text,
        'like': likes,
        'route_ID': routeId
    }

    this.http.postComments(comment).then(data => {
        console.log(data)
        newTemplateComment(comment.name, comment.text, comment.like)
    }).catch(err => {
        console.log(err)
    })
})


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

function loadImage(data) {     /// USING IT
    data.image = String(data.image).replace('127.0.0.1:8001/', 'www.kringeproduction.ru/files/')
    newTemplateImage(data.image)
}

function loadComment(data) {
    newTemplateComment(data.name, data.text, data.like)
    postComments.push({
        'name': data.name,
        'text': data.text,
        'like': data.like
    })
}

function postOnDocumentSetter(object) {
    let images = http.getImages(object)
    images.then(data => {
        data.forEach((item) => {
            loadImage(item)
        })
    })
}

function commentsOnDocumentSetter(object) {
    let comments = http.getComments(object)
    comments.then(data => {
        data.forEach(item => {
            console.log(item)
            loadComment(item)
        })
    })
}

window.onload = function () {
    let selectedPost = localStorage.getItem('selectedPost')

    let mainImage = localStorage.getItem('postMainImage')
    let postName = localStorage.getItem('postName')

    document.getElementById('main-image').src = mainImage
    document.getElementById('route-name').innerText = postName

    if (selectedPost) {
        let parsedPost = JSON.parse(selectedPost)
        document.getElementById('route-description').innerText = String(parsedPost.description)
        postOnDocumentSetter(parsedPost.images)
        commentsOnDocumentSetter(parsedPost.comments)
        routeId = parsedPost.id
    }
}