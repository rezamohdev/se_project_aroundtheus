
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {

    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    console.log(errorMessageEl);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {

    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
}

function checkInputValidty(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, options);
    } else {
        hideInputError(formEl, inputEl, options);
    }
}

function setEventListeners(formEl, options) {
    const { inputSelector } = options;
    const inputEls = [...document.querySelectorAll(options.inputSelector)];
    inputEls.forEach(function (inputEl) {
        inputEl.addEventListener("input", function (e) {
            checkInputValidty(formEl, inputEl, options);
        });
    });
}

function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach(function (formEl) {
        formEl.addEventListener("submit", function (e) {
            e.preventDefault();
        });

        setEventListeners(formEl, options);

    });
}

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__button_type_error",
    errorClass: "modal__error_visible"
};

// enabling validation by calling enableValidation()
// pass all the settings on call

enableValidation(config);