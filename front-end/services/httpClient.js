import {HTTP_request} from './HTTP_request.js';

export class HTTP_client {
    constructor() {
        this.http = new HTTP_request();
        this.images_API = 'https://www.kringeproduction.ru/images/'
        this.routes_API = 'https://www.kringeproduction.ru/routes/'
        this.comments_API = 'https://www.kringeproduction.ru/comments/'
        this.users_API = 'https://www.kringeproduction.ru/users/'
    }

    setHeaders(current_headers) {
        const LS_username = localStorage.getItem('username')
        const LS_password = localStorage.getItem('password')

        if (LS_username === null || LS_password === null) {
            throw new Error('No username or password')
        }

        current_headers["X-USERNAME"] = String(LS_username)
        current_headers["X-PASSWORD"] = String(LS_password)

        return current_headers
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
        }
        return this.http.get(this.routes_API, headers)
    }

    async postNewRoute(routeData) {

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        } //Когда body строится при помощи formdata хедеры не нужны, а когда при помощи JSON.stringfy(объект) то нужны.

        return this.http.post(this.routes_API, routeData, headers)
    }

    async getRoutes() {
        const response = this.http.get(this.routes_API, {
            "Accept": "application/json",
        })

        return response
    }

    async getUser(name) {
        let headers = {'Accept': 'application/json'}
        try {
            headers = this.setHeaders(headers)
        } catch (e) {
            throw new Error(e.message)
        }

        return this.http.get(`${this.users_API}?name=${name}`, headers)
    }

    async createUser(name, email, password) {
        let headers = {'Accept': 'application/json'}
        try {
            headers = this.setHeaders(headers)
        } catch (e) {
            throw new Error(e.message)
        }

        let data = {
            "username": name,
            "password": password,
            "email": email
        }

        console.log(headers)

        return this.http.post(this.users_API, JSON.stringify(data), headers)
    }
}
