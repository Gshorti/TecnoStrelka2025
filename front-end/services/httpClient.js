import { HTTP_request } from './HTTP_request.js';

export class HTTP_client {
    constructor() {
        this.http = new HTTP_request();
        this.images_API = 'https://www.kringeproduction.ru/images/';
        this.routes_API = 'https://www.kringeproduction.ru/routes/'
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'image/jpeg',
        };
    }

    async postImage(file) {
        // let form = {
        //     "image": file
        // }

        return await this.http.post(this.images_API, file, this.headers)
    }

    async getData() {
        return await this.http.get(this.images_API, this.headers)
    }

    async postData(data) {
        return await this.http.post(this.routes_API, data, this.headers)
    }
}
