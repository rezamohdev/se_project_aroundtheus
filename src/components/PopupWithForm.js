import Popup from './Popup';
// === =>
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popupElement;
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._handleFormSubmit = handleFormSubmit;
    }
    _getInputValues() { }
    setEventListeners() { }
    close() {
        this._popupForm.reset();
    }
}