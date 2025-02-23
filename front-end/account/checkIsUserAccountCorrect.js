import {HTTP_client} from '../services/httpClient.js'

let http = new HTTP_client()

function checkIsUserAccountCorrect() {
    http.getUsers().then(() => {
        window.location = 'userHaveAcoount/userAccount.html'
    }).catch((err) => {
        window.location = 'userDontHaveAccount/form.html'
    })
}

function pageHandler() {
    if (localStorage.getItem('username') === null) {
        window.location = 'userDontHaveAccount/form.html'
    } else {
        checkIsUserAccountCorrect()
    }
}

pageHandler()