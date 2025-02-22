import {HTTP_client} from '../../services/httpClient.js'

let http = new HTTP_client()

console.log(http)

document.getElementById('registration-button').addEventListener('click', (e) => {
    console.log(e)

    localStorage.clear()

    let username = document.getElementById('name-register-input').value
    let password = document.getElementById('password-register-input').value
    let email = document.getElementById('email-register-input').value

    localStorage.setItem('username', username)
    localStorage.setItem('password', password)

    http.createUser(username, password, email).then((data) => {
        console.log(data)
    })
})

document.getElementById('sign-in-button').addEventListener('click', (e) => {
    console.log(e)

    localStorage.clear()

    let username = document.getElementById('name-email-input').value
    let password = document.getElementById('password-email-input').value

    localStorage.setItem('username', username)
    localStorage.setItem('password', password)

    http.getUser(username).then((data) => {
        console.log(data)
    })
})