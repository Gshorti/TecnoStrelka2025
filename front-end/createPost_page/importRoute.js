let importPopup = document.getElementById('popup-import-route')
let errorPopup = document.getElementById('error-popup')

function openPopup() {
    importPopup.style.display = 'flex'
}
function closePopUp() {
    importPopup.style.display = 'none'
}

function wheelOnBar(event) {
    event.preventDefault()

    if (event.deltaY > 0) {
        event.currentTarget.scrollLeft += 100
    } else {
        event.currentTarget.scrollLeft -= 100
    }
}

function showErrorPopup() {
    errorPopup.style.display = 'flex'
}

function closeErrorPopUp() {
    errorPopup.style.display = 'none'
}