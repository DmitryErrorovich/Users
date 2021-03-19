import axios from 'axios'

const api = axios.create ({
    baseURL : 'http://localhost:1337/api/users'
})

api.defaults.headers.post['Accept'] = 'application/json'

export default api
