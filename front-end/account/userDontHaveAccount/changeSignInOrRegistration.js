let registration = document.getElementById('registration')
let signIn = document.getElementById('sign-in')
let emailTag = document.getElementById('email-of-user-container')
let errorPopup = document.getElementById('error-popup')

function openRegistration() {
    emailTag.classList.remove('hidden')
    emailTag.classList.add('visible')

    setTimeout(() => {
        registration.style.display = 'flex'
        signIn.style.display = 'none'
    }, 200)
}

function openSignIn() {
    emailTag.classList.remove('visible')
    emailTag.classList.add('hidden')

    setTimeout(() => {
        registration.style.display = 'none'
        signIn.style.display = 'flex'
    }, 200)
}


function closeErrorPopUp() {
    errorPopup.style.display = 'none'
}