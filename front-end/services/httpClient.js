import {HTTP_request} from './HTTP_request.js';

export class HTTP_client {
    constructor() {
        this.http = new HTTP_request();
        this.images_API = 'https://www.kringeproduction.ru/images/'
        this.routes_API = 'https://www.kringeproduction.ru/routes/'
    }

    async postImage(file) {
        let formData = new FormData();
        formData.append("image", file);

        const response = await this.http.post(this.images_API, formData, {
            'Accept': 'application/json'
        });

        return response;
    }


    async getData() {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return await this.http.get(this.images_API, headers)
    }

    async postData(data) {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return await this.http.post(this.routes_API, data, headers)
    }
}
