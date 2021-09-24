class ApiService {
    constructor(baseURL) {
        this.url = baseURL
    }

    async createPost(post) {
        try {
            const request = new Request(`${this.url}/posts.json`, {
                method: 'post',
                body: JSON.stringify(post)
            })
            return (await fetch(request)).json()

        } catch(error) {
            console.log(error)
        }    
    }

    async getPosts() {
        try {
            const request = new Request(`${this.url}/posts.json`)
            return (await fetch(request)).json()

        } catch(error) {
            console.log(error)
        }
    }
}

export const apiService = new ApiService('https://myblog-c2b81-default-rtdb.firebaseio.com')
