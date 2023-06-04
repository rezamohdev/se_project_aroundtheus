export default class Api {
    constructor(name, link) {
        this._baseUrl = baseUrl,
            this._headers = headers
    }

    getInitialCards() {
        return fetch(`https://around.nomoreparties.co/v1/group-12/cards`, {
            method: "GET",
            headers: "9eeac52f-491b-4cc6-8ef1-69498b3521ca"
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
                console.error(`Error: ${err}`);
            });
    }
    getUserInfo() {
        return fetch(`https://around.nomoreparties.co/v1/group-12/users/me`, {
            method: "GET",
            headers: "9eeac52f-491b-4cc6-8ef1-69498b3521ca"
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
                console.error(`Error: ${err}`);
            });
    }
}