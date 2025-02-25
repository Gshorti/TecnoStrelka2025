let route = document.querySelectorAll('.route-menu')
let createMenu = document.querySelector('.new-point-on-route')
let pointMenu = document.querySelector('.created-point-on-route')
let dissmisButton = document.getElementById('dismiss-button')

let currentCoords = []

document.getElementById('map').addEventListener('click', (e) => {
    currentCoords = [e.pageX, e.pageY]
})

function showNewPointOnRoute() {      // ПЖ, Захар сделай, чтоб из yandexMap.js получалась инфа как-нибудь
    console.log(currentCoords)
    createMenu.style.zIndex = '9999'
    createMenu.style.opacity = '1'

    route.style.top = (currentCoords[0] + 10) + 'px'
    route.style.left = (currentCoords[1] + 10) + 'px'


    let output = ''

    let nameOfPoint = document.getElementById('name-of-point').value
    document.getElementById('create-button').addEventListener('click', (e) => {
        output = nameOfPoint.trim()
    })

    dissmisButton.addEventListener('click', (e) => {
        output = null
    })

    document.getElementById('name-of-point').innerText = ''
    createMenu.style.zIndex = '0'
    createMenu.style.opacity = '0'
    return output
}

function managePoint(userPoint) {      // ПЖ, Захар сделай, чтоб из yandexMap.js получалась инфа как-нибудь
    console.log(currentCoords)
    pointMenu.style.zIndex = '9999'
    pointMenu.style.opacity = '1'

    route.style.top = (currentCoords[0] + 10) + 'px'
    route.style.left = (currentCoords[1] + 10) + 'px'

    let isDeleted = false

    document.getElementById('delete-button').addEventListener('click', (e) => {
        isDeleted = true
    })

    pointMenu.style.zIndex = '0'
    pointMenu.style.opacity = '0'
    return isDeleted
}