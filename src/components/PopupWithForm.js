import Popup from './Popup';
// === =>
export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._inputList = this._popupElement.querySelectorAll('.modal__input');
        this._handleFormSubmit = handleFormSubmit;
    }
    close() {
        this._popupForm.reset();
        this._popupForm.removeEventListener('submit', this._handleFormSubmit);
        super.close();
    }
    _getInputValues() {
        this._newData = {};
        this._inputList.forEach((inputElement) => {
            this._newData[inputElement.name] = inputElement.value;
        });
        return this._newData;

    }
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });

        super.setEventListeners();
    }
}