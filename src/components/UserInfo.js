export default class UserInfo {
    constructor({ userNameSelector, userDescriptionSelector }) {
        this._userNameElement = document.querySelector(`.${userNameSelector}`);
        this._userDescriptionElement = document.querySelector(`.${userDescriptionSelector}`);
    }

    getUserInfo() {
        return {
            userName: this._userNameElement,
            userDescription: this._userDescriptionElement
        }
    }

    setUserInfo({ userName, userDescription }) {
        this._userNameElement.textContent = userName;
        this._userDescriptionElement.textContent = userDescription;
    }
}