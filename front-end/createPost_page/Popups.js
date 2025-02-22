let importPopup = document.getElementById('popup-import-route')
let errorPopup = document.getElementById('error-popup')

function openPopup() {
    importPopup.style.display = 'flex'
}
function closePopUp() {
    importPopup.style.display = 'none'
}

function showErrorPopup() {
    errorPopup.style.display = 'flex'
}

function closeErrorPopUp() {
    errorPopup.style.display = 'none'
}