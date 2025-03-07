import {HTTP_client} from '../services/httpClient.js'

let http = new HTTP_client()

let postComments = []
let routeId = 0
let currentComments = []
let username = String(localStorage.getItem('username'))
let coordinates = []
let routeName

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
        http.updateRoute(data, routeId, currentComments).then((out) => {
        })
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
    data.image = http.imagePipe(data.image)
    console.log(data.image)
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

function firstDataHandler(data) {
    let imageParsed = http.getImages([data.images[0]])
    imageParsed.then((data) => {
        let mainImage = String(data[0].image)
        mainImage = http.imagePipe(mainImage)
        document.getElementById('main-image').src = mainImage
    })

    document.getElementById('route-name').innerText = data.name
    document.getElementById('route-description').innerText = data.description

}

function getRoutesData() {
    let ids = window.location.search
    let splitedID = ids.split('=')[1]

    http.getRoute(splitedID).then(data => {
        document.getElementById('route-description').innerText = String(data.description)

        firstDataHandler(data)
        postOnDocumentSetter(data.images)
        commentsOnDocumentSetter(data.comments)

        routeName = data.name
        currentComments = data.comments
        routeId = data.id

        let coords = data.data
        coordinatesHandler(coords)

        for (let i = 0; i < coords.length; i++) {
            coordinates.push(coords[i]);
        }

        http.getUser(username).then((user) => {
            if (user[0].visited.includes(routeId)) {
                let checkbox = document.getElementById('checkbox-if-visit')
                checkbox.checked = true
            }
        })
    })
}

getRoutesData()

document.getElementById('sharePost').addEventListener('click', async function (e) {
    try {
        this.shareData = {
            title: routeName,
            url: window.location.href,
        };

        await navigator.share(this.shareData)
    } catch (err) {
        console.error(err)
    }
})