import Popup from './Popup';
export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit, loadingText }) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._inputList = this._popupElement.querySelectorAll('.modal__input');
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._popupForm.querySelector(".modal__button[type='submit']");
        this._submitButtonText = this._submitButton.textContent;
        this._loadingText = loadingText;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            // here you insert the `value` by the `name` of the input
            input.value = data[input.name];
        });
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
    _getInputValues() {
        this._newData = {};
        this._inputList.forEach((inputElement) => {
            this._newData[inputElement.name] = inputElement.value;
        });
        return this._newData;
    }
    setSubmitAction(action) {
        this._handleFormSubmit = action;
    }
    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = this._loadingText;
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });

        super.setEventListeners();
    }
}