export default class Api {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl,
            this._headers = headers
    }

    getInitialCards() {
        return fetch(`https://around.nomoreparties.co/v1/group-12/cards`, {
            method: "GET",
            headers: {
                authorization: "9eeac52f-491b-4cc6-8ef1-69498b3521ca",
                "Content-Type": "application/json",
            },
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
            .then((err) => {
                console.error(err);
            });
    }
    getUserInfo() {
        return fetch(`https://around.nomoreparties.co/v1/group-12/users/me`, {
            method: "GET",
            headers: {
                authorization: "9eeac52f-491b-4cc6-8ef1-69498b3521ca",
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .then((err) => {
                console.error(err);
            });
    }
}