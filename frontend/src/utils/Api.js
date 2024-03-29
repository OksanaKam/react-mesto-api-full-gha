class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }
    
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } 
        return Promise.reject(`${res.status}`);
    }

    _request(endpoint, options) {
        return fetch(`${this._baseUrl}/${endpoint}`, options).then(this._checkResponse);
    }

    getUserInfo() {
        return this._request(`users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
    }

    getInitialCards() {
        return this._request(`cards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
    }

    postUserInfo(userData) {
        return this._request(`users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        });
    }

    addNewCard(data) {
        return this._request(`cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        });
    }

    changeAvatar(userData) {
        return this._request(`users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                avatar: userData.avatar
            })
        });
    }

    deleteCard(cardId) {
        return this._request(`cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
    }

    addLike(cardId) {
        return this._request(`cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
    }

    removeLike(cardId) {
        return this._request(`cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
    }
}

const api = new Api({
    baseUrl: 'https://api.oksanakam.nomoreparties.sbs',
});

export default api;
