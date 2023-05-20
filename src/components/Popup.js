export default class Popup {
    constructor({ popupSelector }) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    setEventListeners() { }
    open() {
        this._popupElement.classList.add('modal_opened');
    }
    close() {
        this._popupElement.classList.remove('modal_opened');

    }
}