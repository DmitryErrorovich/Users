import axios from 'axios'

const api = axios.create ({
    baseURL : 'https://randomuser.me/api/'
})

api.defaults.headers.post['Accept'] = 'application/json'

export default api
