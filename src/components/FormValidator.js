class FormValidator {
    constructor(settings, formElement) {
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        this._formElement = formElement;

    }

    _showInputError(inputElement) {

        const errorMessageEl = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorMessageEl.textContent = inputElement.validationMessage;
        errorMessageEl.classList.add(this._errorClass);
    }
    _hideInputError(inputElement) {

        const errorMessageEl = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorMessageEl.textContent = "";
        errorMessageEl.classList.remove(this._errorClass);
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton();
            return;
        }
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this.toggleButtonState();
    }

    _disableButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _checkInputValidty(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return !this._inputList.every((inputElement) => {
            return inputElement.validity.valid;
        });
    }

    _setEventListeners() {
        this._inputList = [...this._formElement.querySelectorAll(this._inputSelector)];
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", (e) => {
                this._checkInputValidty(inputElement);
                this.toggleButtonState(this._inputList);
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener("submit", function (e) {
            e.preventDefault();
        });
        this._setEventListeners();
    }

}

export default FormValidator;