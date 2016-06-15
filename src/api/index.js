import Api from './api';

const api = new Api({
    baseURI: '/api',
    headers: {
        'Accept': 'application/json',
        'X-Requested-With':'XMLHttpRequest'
    }
})

export default api
