let routes = document.querySelectorAll('.route-menu')
let createMenu = document.querySelector('#new-point-on-route')
let pointMenu = document.querySelector('#created-point-on-route')
let dissmisCreateButton = document.getElementById('dismiss-button')
let dissmisDeleteButton = document.getElementById('dismiss-delete-button')

let outputToNewPoint = ''
let nameOfPoint = document.getElementById('name-of-point')
let isPointDeleted = false

document.getElementById('create-button').addEventListener('click', (e) => {
    outputToNewPoint = nameOfPoint.trim()
    document.getElementById('name-of-point').innerText = ''
    createMenu.style.display = 'none'
})

dissmisCreateButton.addEventListener('click', (e) => {
    outputToNewPoint = null
    document.getElementById('name-of-point').innerText = ''
    createMenu.style.display = 'none'
})

document.getElementById('delete-button').addEventListener('click', (e) => {
    isPointDeleted = true
    pointMenu.style.display = 'none'
})

dissmisDeleteButton.addEventListener('click', (e) => {
    pointMenu.style.display = 'none'
})


function showNewPointOnRoute(cords) {      // ПЖ, Захар сделай, чтоб из yandexMap.js получалась инфа как-нибудь
    createMenu.style.display = 'flex'

    createMenu.style.top = cords[1] + 10 + 'px'
    createMenu.style.left = cords[0] + 10 + 'px'

    return outputToNewPoint
}

function managePoint(cords) {      // ПЖ, Захар сделай, чтоб из yandexMap.js получалась инфа как-нибудь
    pointMenu.style.display = 'flex'

    pointMenu.style.top = cords[1] + 10 + 'px'
    pointMenu.style.left = cords[0] + 10 + 'px'

    return isPointDeleted
}