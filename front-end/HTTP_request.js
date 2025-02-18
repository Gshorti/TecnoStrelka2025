class HTTP_request {
    allPostURL = ''

    constructor() {
    }

    setRequest(method, url, body) {
        let xhr = new XMLHttpRequest()
        xhr.open(method, url, body)
        xhr.send()
        xhr.onload = function () {
            if (xhr.status !== 200) {
                return xhr.status
            } else {
                return xhr.response
            }
        }
    }

    getData() {
        this.setRequest('GET', this.allPostURL, {'content-type': 'application/json'})
    }
}