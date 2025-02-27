import {HTTP_client} from '../services/httpClient.js'

let http = new HTTP_client()
let postComments = []
let routeId = 0
let currentComments = []
let username = String(localStorage.getItem('username'))
let isVisited = false

var debounce = function (fn, t) {
    let timer
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(this, args)
        }, t)
    }
}


function setIsVisited() {
    http.getUser(username).then((user) => {
        http.visitedRoutes(routeId, user[0].id, user[0].email, user[0].visited).then()
    })
}


let deb = debounce(setIsVisited, 1500)

document.getElementById('checkbox-if-visit').addEventListener('click', (e) => {
    deb()
})


document.querySelector('.make-reaction').addEventListener('click', () => {
    let likes = currentStarsValue
    let text = document.querySelector('.text-of-reaction').value

    let comment = {
        'name': username,
        'text': text,
        'like': likes,
        'route_ID': routeId
    }

    closePopUp()
    newTemplateComment(comment.name, comment.text, comment.like)
    http.postComments(comment).then(data => {
        http.updateRoute(data, routeId, currentComments).then((out) => {})
    }).catch(err => {
        console.error(err)
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

function loadImage(data) {
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
            loadComment(item)
        })
    })
}

let coordinates = []

window.onload = function getRoutesData() {
    let selectedPost = localStorage.getItem('selectedPost')

    let mainImage = localStorage.getItem('postMainImage')
    let postName = localStorage.getItem('postName')

    document.getElementById('main-image').src = mainImage
    document.getElementById('route-name').innerText = postName

    if (selectedPost) {
        http.getRoute(JSON.parse(selectedPost).id).then(data => {
            document.getElementById('route-description').innerText = String(data.description)
            postOnDocumentSetter(data.images)
            commentsOnDocumentSetter(data.comments)
            currentComments = data.comments
            routeId = data.id

            let coords = data.data


            for (let i=0; i < coords.length; i++) {
                coordinates.push(coords[i]);
                console.log(coordinates)
            }

            http.getUser(username).then((user) => {
                if (user[0].visited.includes(routeId)) {
                    let checkbox = document.getElementById('checkbox-if-visit')
                    checkbox.checked = true
                }
            })
        })
    }
}

export { coordinates }