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

    _toggleButtonState() {
        const submitButton = this._formElement.querySelector(this._submitButtonSelector);
        if (this._hasInvalidInput(this._inputList)) {
            submitButton.classList.add(this._inactiveButtonClass);
            submitButton.disabled = true;
            return;
        }
        submitButton.classList.remove(this._inactiveButtonClass);
        submitButton.disabled = false;
    }


    _checkInputValidty(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }


    _hasInvalidInput(inputList) {
        return !inputList.every((inputElement) => {
            inputElement.validity.valid;
        });
    }

    _setEventListeners() {
        this._inputList = [...this._formElement.querySelectorAll(this._inputSelector)];
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", (e) => {
                this._checkInputValidty(inputElement);
                this._toggleButtonState();
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