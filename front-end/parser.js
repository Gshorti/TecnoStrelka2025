function setPostData(event) {
    let postContainer = event.target.closest('.post')
    let sysData = JSON.parse(postContainer.querySelector('#systemData').innerText)
    window.location = `selfPost_page/selfPost.html?id=${sysData.id}`
}