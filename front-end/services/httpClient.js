import { HTTP_request } from './HTTP_request.js';

export class HTTP_client {
    constructor() {
        this.http = new HTTP_request();
        this.images_API = 'https://www.kringeproduction.ru/images/';
        this.routes_API = 'https://www.kringeproduction.ru/routes/'
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
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
        return await this.http.get(this.images_API, this.headers)
    }

    async postData(data) {
        return await this.http.post(this.routes_API, data, this.headers)
    }
}
