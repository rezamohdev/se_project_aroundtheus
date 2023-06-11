export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl,
            this._headers = headers
    }
    getAppInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error ${res.status}`)
    }
    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }
    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, { headers: this._headers });
    }

    addCard({ title, url }) {
        return this._request(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: title,
                link: url
            })
        });

    }

    removeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        });
    }

    getUserInfo() {
        return this._request(`${this._baseUrl}//users/me`, { headers: this._headers });
    }

    userEditProfile({ title, description }) {
        return this._request(`${this._baseUrl}//users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: title,
                about: description
            })
        });
    }

    likeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers
        });
    }
    unLikeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/likes/${cardId}`, { method: "DELETE", headers: this._headers });
    }

    updateUserProfile(avatar) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(avatar)
        });

    }
}