export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl,
            this._headers = headers
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    addCard({ title, url }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: title,
                link: url
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`)
        })
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
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`)
        })
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`)
            })
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

        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
            .then((data) => {

                return data;
            })
            .catch(err => { console.error(err); })
    }

    getLikesCount(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "GET",
            headers: this._headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).then((likeData) => {
            console.log(likeData);
            return likeData;
        }).catch((err) => console.error(err))
    }
    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).then((likeData) => {
            console.log(likeData);
            return likeData;
        }).catch((err) => console.error(err))
    }
    unLikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).then((likeData) => {
            console.log(likeData);
            return likeData;
        }).catch((err) => console.error(err))
    }

    updateUserProfile(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(avatar)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).then((data) => { return data; })
            .catch((err) => console.error(err));

    }
}