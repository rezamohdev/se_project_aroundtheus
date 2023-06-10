export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl,
            this._headers = headers
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
        this._request(`${this._baseUrl}/cards`, { headers: this._headers })
            .then((data) => { return data; });
    }

    addCard({ title, url }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: title,
                link: url
            })
        }).then(this._checkResponse)
            .then((data) => {

                return data;
            })
            .catch((err) => {
                console.error(err);
            })
    }

    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse)
            .then((data) => {

                return data;
            })
            .catch((err) => {
                console.error(err);
            })
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
            .then(this._checkResponse)
            .catch((err) => {
                console.error(err);
            });
    }

    userEditProfile({ title, description }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: title,
                about: description
            })

        }).then(this._checkResponse)
            .then((data) => {

                return data;
            })
            .catch(err => { console.error(err); })
    }

    getLikesCount(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "GET",
            headers: this._headers
        }).then(this._checkResponse).then((likeData) => {
            console.log(likeData);
            return likeData;
        }).catch((err) => console.error(err))
    }
    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers
        }).then(this._checkResponse).then((likeData) => {
            console.log(likeData);
            return likeData;
        }).catch((err) => console.error(err))
    }
    unLikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        }).then(this._checkResponse).then((likeData) => {
            console.log(likeData);
            return likeData;
        }).catch((err) => console.error(err))
    }

    updateUserProfile(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(avatar)
        }).then(this._checkResponse).then((data) => { return data; })
            .catch((err) => console.error(err));

    }
}