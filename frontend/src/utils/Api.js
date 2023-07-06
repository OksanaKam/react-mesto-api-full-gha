class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    
    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        } 
        return Promise.reject(`${res.status}`)
    }

    _request(endpoint, options) {
        return fetch(`${this._baseUrl}/${endpoint}`, options).then(this._checkResponse)
    }

    getUserInfo() {
        return this._request(`users/me`, {
            method: 'GET',
            headers: this._headers,
        });
    }

    getInitialCards() {
        return this._request(`cards`, {
            method: 'GET',
            headers: this._headers,
        });
    }

    postUserInfo(userData) {
        return this._request(`users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        });
    }

    addNewCard(data) {
        return this._request(`cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        });
    }

    changeAvatar(userData) {
        return this._request(`users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: userData.avatar
            })
        });
    }

    deleteCard(cardId) {
        return this._request(`cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        });
    }

    addLike(cardId) {
        return this._request(`cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        });
    }

    removeLike(cardId) {
        return this._request(`cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        });
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
});

export default api;
