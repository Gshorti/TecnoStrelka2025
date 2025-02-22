function setPostData(event) {
    let postContainer = event.target.closest('.post')
    let sysData = postContainer.querySelector('#systemData').innerText
    let postImage = postContainer.querySelector('#mainImage').src
    let postName = postContainer.querySelector('.name-of-post').innerText

    localStorage.setItem('selectedPost', sysData)
    localStorage.setItem('postMainImage', postImage)
    localStorage.setItem('postName', postName)
    localStorage.setItem('postDescription', sysData.description)

    window.location = 'selfPost_page/selfPost.html'
}

function cleaner() {
    localStorage.removeItem('selectedPost')
    localStorage.removeItem('postMainImage')
    localStorage.removeItem('postName')
    localStorage.removeItem('postDescription')
}

cleaner()