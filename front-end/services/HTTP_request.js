export class HTTP_request {
    async get(url, headers) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
            });

            if (!response.ok) {
                return Promise.reject(response);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return Promise.reject(new Error(error.message));
        }
    }

    async post(url, body, headers) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: body, // body теперь может быть FormData
            });
    
            if (!response.ok) {
                return Promise.reject(response);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            return Promise.reject(new Error(error.message));
        }
    }
    async put(url, body, headers) {
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: body, // body теперь может быть FormData
            });
    
            if (!response.ok) {
                return Promise.reject(response);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            return Promise.reject(new Error(error.message));
        }
    }    
}

