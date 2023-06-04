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
                console.log(data);
            })
            .catch((err) => {
                console.error(err);
            });
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
}