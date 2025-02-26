let routesMenus = document.querySelectorAll('.route-menu')
let createMenu = document.querySelector('#new-point-on-route')
let pointMenu = document.querySelector('#created-point-on-route')
let dissmisCreateButton = document.getElementById('dismiss-button')
let dissmisDeleteButton = document.getElementById('dismiss-delete-button')

let outputToNewPoint = ''
let nameOfPoint = document.getElementById('name-of-point')
let isPointDeleted = false

document.getElementById('create-button').addEventListener('click', (e) => {
    outputToNewPoint = nameOfPoint.value.trim()
    document.getElementById('name-of-point').innerText = ''
    closeAll()
})

dissmisCreateButton.addEventListener('click', (e) => {
    outputToNewPoint = null
    document.getElementById('name-of-point').innerText = ''
    closeAll()
})

document.getElementById('delete-button').addEventListener('click', (e) => {
    isPointDeleted = true
    closeAll()
})

dissmisDeleteButton.addEventListener('click', (e) => {
    closeAll()
})


function closeAll() {
    for (let i = 0; i < routesMenus.length; i++) {
        routesMenus[i].style.display = 'none'
        routesMenus[i].style.opacity = '0'
        routesMenus[i].style.zIndex = '0'
    }
}


function showNewPointOnRoute(cords) {      // ПЖ, Захар сделай, чтоб из yandexMap.js получалась инфа как-нибудь
    createMenu.style.display = 'flex'

    createMenu.style.top = cords[1] + 10 + 'px'
    createMenu.style.left = cords[0] + 10 + 'px'
    createMenu.style.zIndex = '9999'
    createMenu.style.opacity = '1'

    return outputToNewPoint
}

function managePoint(cords) {      // ПЖ, Захар сделай, чтоб из yandexMap.js получалась инфа как-нибудь
    pointMenu.style.display = 'flex'

    pointMenu.style.top = cords[1] + 10 + 'px'
    pointMenu.style.left = cords[0] + 10 + 'px'
    pointMenu.style.zIndex = '9999'
    pointMenu.style.opacity = '1'

    return isPointDeleted
}