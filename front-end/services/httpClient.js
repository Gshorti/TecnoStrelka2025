import {HTTP_request} from './HTTP_request.js';

export class HTTP_client {
    constructor() {
        this.http = new HTTP_request()
        this.master_link = 'www.kringeproduction.ru/'
        this.images_API = 'https://' + this.master_link + 'images/'
        this.routes_API = 'https://' + this.master_link + 'routes/'
        this.comments_API = 'https://' + this.master_link + 'comments/'
        this.users_API = 'https://' + this.master_link + 'users/'
        this.createUser_API = 'https://' + this.master_link + 'create_user/'
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

    async getRoutes() {
        let data = []
        await this.http.get(this.routes_API, {
            "Accept": "application/json",
        }).then(res => {
            data = res
        })
        return data.filter(route => route.review === 'good')
    }

    async getRoute(routeID) {
        let headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        return this.http.get(this.routes_API + routeID + '/', headers)
    }

    async postImage(file) {
        let formData = new FormData()
        formData.append("image", file)

        const response = this.http.post(this.images_API, formData, {
            'Accept': 'application/json'
        })

        return await response
    }

    async postImages(filesArray) {
        let outputData = []
        for (let i = 0; i < filesArray.length; i++) {
            let file = filesArray[i]
            outputData.push(this.postImage(file))
        }
        return outputData
    }

    async getImages(ids) {
        let data = []
        const response = await this.http.get(this.images_API, {
            'Accept': 'application/json'
        }).then(
            (rel) => {
                data = rel
            }
        )

        return await data.filter(image => ids.includes(image.id))
    }

    async getImagesCount() {
        return await this.http.get(this.images_API, {
            'Accept': 'application/json'
        })
    }

    async getComments(ids) {
        let data = []
        const response = await this.http.get(this.comments_API, {
            'Accept': 'application/json'
        }).then(
            (rel) => {
                data = rel
            }
        )

        return data.filter(comment => ids.includes(comment.id))
    }

    async postComments(comment_data) {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        try {
            headers = this.setHeaders(headers)
        } catch (e) {
            throw new Error(e.message)
        }

        let body = {
            "name": comment_data.name,
            "text": comment_data.text,
            "like": comment_data.like
        }

        return await this.http.post(this.comments_API, JSON.stringify(body), headers)
    }

    async postNewRoute(routeData) {

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        return this.http.post(this.routes_API, routeData, headers)
    }

    async getUsers() {
        let headers = {'Accept': 'application/json'}
        try {
            headers = this.setHeaders(headers)
        } catch (e) {
            throw new Error(e.message)
        }

        let request = this.http.get(`${this.users_API}`, headers)
        return await request
    }

    async getUser(username) {
        let headers = {'Accept': 'application/json'}
        try {
            headers = this.setHeaders(headers)
        } catch (e) {
            throw new Error(e.message)
        }

        return await this.http.get(this.users_API + `?name=${username}`, headers)
    }

    async createUser(name, password, email) {
        let headers = {
            "Accept": 'application/json',
            "content-type": 'application/json',
        }
        try {
            headers = this.setHeaders(headers)
        } catch (e) {
            throw new Error(e.message)
        }

        let data = {
            "name": name,
            "password": password,
            "email": email
        }

        return this.http.post(this.createUser_API, JSON.stringify(data), headers)
    }

    async getUserRoutes(userName) {
        let data = []
        let headers = {
            "Accept": 'application/json',
            "content-type": 'application/json',
        }
        try {
            headers = this.setHeaders(headers)
        } catch (e) {
            throw new Error(e.message)
        }
        const response = await this.http.get(this.users_API, headers).then(
            (rel) => {
                data = rel
            }
        )

        return data.filter(user => user.name === userName)[0]
    }

    async addUserRoute(userId, routId) {
        let headers = {
            "Accept": 'application/json',
            "content-type": 'application/json',
        }
        try {
            headers = this.setHeaders(headers)
        } catch (e) {
            throw new Error(e.message)
        }

        let body = {}

        return await this.http.put(this.users_API + userId + '/', body, headers)
    }

    async updateRoute(commentData, routeId, currentComments) {
        let headers = {
            "Accept": "application/json",
            "content-type": 'application/json',
        }
        try {
            headers = this.setHeaders(headers)
        } catch (e) {
            throw new Error(e.message)
        }

        if (!Array.isArray(currentComments)) {
            currentComments = []
        }

        currentComments.push(commentData.id)

        let body = {
            'comments': currentComments
        }

        return await this.http.put(this.routes_API + routeId + '/', JSON.stringify(body), headers)
    }

    async visitedRoutes(routeId, userId, userMail, currentVisited) {
        let headers = {
            "Accept": "application/json",
            "Content-type": 'application/json',
        }
        try {
            headers = this.setHeaders(headers)
        } catch (e) {
            throw new Error(e.message)
        }

        if (!Array.isArray(currentVisited)) {
            currentVisited = []
        }

        if (currentVisited.includes(routeId)) {
            currentVisited.splice(currentVisited.indexOf(routeId), 1)
        } else {
            currentVisited.push(routeId)
        }

        let username = String(localStorage.getItem('username'))

        let body = {
            'visited': currentVisited,
            'name': username,
            'email': userMail,
            'password': String(localStorage.getItem('password'))
        }

        return await this.http.put(this.users_API + userId + '/', JSON.stringify(body), headers)
    }

    imagePipe(image) {
        image = String(image).replace('127.0.0.1:8001/', `${this.master_link}files/`)
        return image
    }
}