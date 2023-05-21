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
    setEventListeners() {
        const modalCloseButton = this._popupElement.querySelector('.modal__close');
        modalCloseButton.addEventListener('click', () => this.close());
        this._popupElement.addEventListener('click', (event) => {
            if (event.target === this._popupElement) {
                this.close();
            }
        });

    }
    open() {
        this._popupElement.classList.add('modal_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popupElement.classList.remove('modal_opened');
        document.removeEventListener('keydown', this._handleEscClose);

    }
}