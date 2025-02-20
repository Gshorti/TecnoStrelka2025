let popup = document.getElementById('popup-import-route')

function openPopup() {
    popup.style.display = 'flex'
}
function closePopUp() {
    popup.style.display = 'none'
}

function wheelOnBar(event) {
    event.preventDefault()

    if (event.deltaY > 0) {
        event.currentTarget.scrollLeft += 100
    } else {
        event.currentTarget.scrollLeft -= 100
    }
}