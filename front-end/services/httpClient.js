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

        const response = await this.http.post(this.images_API, formData, {
            'Accept': 'application/json'
        });

        return response;
    }

    async getImages() {
        const response = await this.http.get(this.images_API, {
            'Accept': 'application/json'
        })

        return response
    }

    async getComments() {
        const response = await this.http.get(this.comments_API, {
            'Accept': 'application/json'
        })

        return response
    }

    async getData() {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return await this.http.get(this.routes_API, headers)
    }

    async postRoutes(data) {
        let headers = {
            'Accept': 'application/json',
            // 'Content-Type': 'application/json'
        }
        return await this.http.post(this.routes_API, data, headers)
    }

    async getRoutes() {
        const response = await this.http.get(this.routes_API, {
            "Accept": "application/json",
        })

        return response;
    }
}
