let popup = document.querySelector('.popup')
let errorPopup = document.getElementById('error-popup')

function openPopup() {
    popup.style.display = 'flex'
}
function closePopUp() {
    popup.style.display = 'none'
}

function showErrorPopup() {
    errorPopup.style.display = 'flex'
}

function closeErrorPopUp() {
    errorPopup.style.display = 'none'
}