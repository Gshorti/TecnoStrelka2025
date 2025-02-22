function setPostData(event) {
    let postContainer = event.target.closest('.post')
    let sysData = postContainer.querySelector('#systemData').innerText

    localStorage.setItem('selectedPost', JSON.stringify(sysData))
    window.location = 'selfPost_page/selfPost.html'
}

function cleaner() {
    localStorage.removeItem('selectedPost')
}

cleaner()