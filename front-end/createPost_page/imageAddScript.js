let current_index = 0
let basicURL_addImage = '../static/img/addImage.svg'
let filesArray = []

window.onload = function () {
    newTemplateImage();
}

function newTemplateImage() {
    const template = document.getElementById('new-image-template');
    const clone = document.importNode(template.content, true);
    clone.querySelector('#data-image-id').innerText = current_index
    document.getElementById('images-or-route').appendChild(clone);

}

function inputFile(event) {
    const input = event.target;
    const file = input.files[0];
    filesArray.push(file)
    current_index += 1

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        let imageContainer = input.closest('.image');
        imageContainer.querySelector('.create-image').src = e.target.result;
        imageContainer.querySelector('.delete-image').style.display = 'flex';
    }

    newTemplateImage()
}

function deleteImage(event) {
    let imageContainer = event.target.closest('.image');
    let image = imageContainer.querySelector('.create-image');

    if (document.querySelectorAll('.image').length > 1) {
        let deleted_value = imageContainer.querySelector('#data-image-id').innerText
        delete filesArray[deleted_value]
        imageContainer.remove()
    } else {
        filesArray = []
        imageContainer.querySelector('.create-image').src = basicURL_addImage;
        imageContainer.querySelector('.delete-image').style.display = 'none';
    }
}
