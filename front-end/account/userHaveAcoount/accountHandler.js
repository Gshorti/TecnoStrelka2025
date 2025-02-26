let usernameTeg = document.getElementById('username-of-user')

function exitAccount() {
    localStorage.clear()
    window.location = '../userDontHaveAccount/form.html'
}

function usernameHandler(){
    let username = localStorage.getItem('username')
    let password = localStorage.getItem('password')
    usernameTeg.innerText = username
}

usernameHandler()