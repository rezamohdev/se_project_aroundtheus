export default class Popup {
    constructor(popupSelector) {
        this._container = document.querySelector(popupSelector);
    }
    open() { }
    close() { }
    _handleEscClose() { }
    setEventListeners() { }
}