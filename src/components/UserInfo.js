export default class UserInfo {
    constructor({ userNameSelector, userDescriptionSelector }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    }

    getUserInfo() {
        return {
            userName: this._userNameElement,
            userDescription: this._userDescriptionElement
        }
    }

    setUserInfo({ title, description }) {
        this._userNameElement.textContent = title;
        this._userDescriptionElement.textContent = description;
        console.log(this._userNameElement.textContent);
        console.log(this._userDescriptionElement.textContent);
    }
}