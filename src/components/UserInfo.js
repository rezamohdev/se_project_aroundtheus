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

    setUserInfo({ userName, userDescription }) {
        console.log(this._userNameElement);
        console.log(this._userDescriptionElement);
        // this._userNameElement = userName;
        // this._userDescriptionElement = userDescription;
        this._userNameElement.textContent = userName;
        this._userDescriptionElement.textContent = userDescription;
    }
}