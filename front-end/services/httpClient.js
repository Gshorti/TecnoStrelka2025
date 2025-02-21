import {HTTP_request} from './HTTP_request.js';

export class HTTP_client {
    constructor() {
        this.http = new HTTP_request();
        this.images_API = 'https://www.kringeproduction.ru/images/'
        this.routes_API = 'https://www.kringeproduction.ru/routes/'
        this.comments_API = 'https://www.kringeproduction.ru/comments/'
    }

    async postImage(file) {
        let formData = new FormData();
        formData.append("image", file);

        const response = this.http.post(this.images_API, formData, {
            'Accept': 'application/json'
        });

        return await response
    }

    async postImages(filesArray) {
        let outputData = []
        for (let i = 0; i < filesArray.length; i++) {
            let file = filesArray[i]
            outputData.push(this.postImage(file))
        }
        return await outputData
    }

    async getImages() {
        const response = this.http.get(this.images_API, {
            'Accept': 'application/json'
        })

        return response
    }

    async getComments() {
        const response = this.http.get(this.comments_API, {
            'Accept': 'application/json'
        })

        return response
    }

    async getData() {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return this.http.get(this.routes_API, headers)
    }

    async postNewRoute(routeData) {
        let formData = new FormData()
        formData.append("name", routeData.name)
        formData.append("description", routeData.description)
        formData.append("image", routeData.image)
        formData.append("comments", routeData.comments)
        formData.append("data", routeData.data)
        formData.append("private", routeData.private)
        formData.append("history", routeData.history)

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return this.http.post(this.routes_API, formData, headers)
    }

    async getRoutes() {
        const response = this.http.get(this.routes_API, {
            "Accept": "application/json",
        })

        return response;
    }
}
