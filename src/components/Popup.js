export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    _handleEscClose(evt) { }
    setEventListeners() { }
    open() { }
    close() { }
}