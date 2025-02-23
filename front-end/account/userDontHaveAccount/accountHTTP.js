import {HTTP_client} from '../../services/httpClient.js'

let http = new HTTP_client()
let errorPopup = document.getElementById('error-popup')


document.getElementById('registration-button').addEventListener('click', (e) => {
    localStorage.clear()

    let username = document.getElementById('name-register-input').value
    let password = document.getElementById('password-register-input').value
    let email = document.getElementById('email-register-input').value

    localStorage.setItem('username', username)
    localStorage.setItem('password', password)

    http.createUser(username, password, email).then((data) => {
        window.location = '../userHaveAcoount/userAccount.html'
    })
})

document.getElementById('sign-in-button').addEventListener('click', (e) => {
    localStorage.clear()

    let username = document.getElementById('name-email-input').value
    let password = document.getElementById('password-email-input').value

    localStorage.setItem('username', username)
    localStorage.setItem('password', password)

    let DBusers = http.getUsers()
    DBusers.then(() => {
        window.location = '../userHaveAcoount/userAccount.html'
    }).catch((err) => {
        showErrorPopup()
    })
})

function showErrorPopup() {
    errorPopup.style.display = 'flex'
}