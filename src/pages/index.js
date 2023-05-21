// Imports
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    },

    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
    },

    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    },

    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    }
];

// Buttons
const profileEditButton = document.querySelector('#profile-edit-button');
const cardAddButton = document.querySelector('#profile-add-button');

// Modals
const profileModalSelector = "#profile-modal";
const profileModal = document.querySelector(profileModalSelector);
const cardModalSelector = '#card-modal';
const cardModal = document.querySelector(cardModalSelector);
const imageModalSelector = '#image-modal';
const imageModal = document.querySelector(imageModalSelector);
const modalImageElement = document.querySelector('.modal__image');
const modalCaptionElement = document.querySelector('.modal__caption');

// others
const closeModalButton = document.querySelector('#modal-close');
const closeCardModalButton = cardModal.querySelector('#card-modal-close');
const closeImageModalButton = imageModal.querySelector('#image-modal-close');
const userNameSelector = ('#profile-title');
const profileTitle = document.querySelector(userNameSelector);
const userDescriptionSelector = '#profile-description';
const profileDescription = document.querySelector(userDescriptionSelector);
const newCardTitle = cardModal.querySelector('#modal-title-input');
const newCardUrl = cardModal.querySelector('#modal-url-input');
const modalNameInputSelector = '#modal-name';
const modalNameInput = document.querySelector(modalNameInputSelector);
const modalDescriptionInputSelector = '#modal-description';
const modalDescriptionInput = document.querySelector(modalDescriptionInputSelector);
const modalSubmitButton = document.querySelector('#modal-submit-button');
const cardModalSubmitButton = document.querySelector('#card-modal-submit-button');
const cardListElement = document.querySelector('.gallery__cards');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
// forms
const modalProfileForm = profileModal.querySelector('.modal__form');
const modalCardForm = cardModal.querySelector('.modal__form');

// ==================================================================
//  validation
// ==================================================================

const validationSettings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__button_type_error",
    errorClass: "modal__error_visible"
};

// instantiating card objects
const editFormValidator = new FormValidator(validationSettings, modalProfileForm);
const addFormValidator = new FormValidator(validationSettings, modalCardForm);

const userInfo = new UserInfo({ userNameSelector, userDescriptionSelector });

const modalWithImage = new PopupWithImage({ popupSelector: imageModalSelector });

const modalWithFormUser = new PopupWithForm({
    popupSelector: profileModalSelector,
    handleFormSubmit: (data) => {
        userInfo.setUserInfo(data);
    }
});

const modalWithFormImage = new PopupWithForm({
    popupSelector: cardModalSelector, handleFormSubmit: () => {
        const name = newCardTitle.value;
        const link = newCardUrl.value;
        renderCard({ name, link }, cardListElement);

        // addFormValidator.toggleButtonState();
    }
});

// setting event listeners
editFormValidator.enableValidation();
addFormValidator.enableValidation();

modalWithFormUser.setEventListeners();
modalWithFormImage.setEventListeners();
modalWithImage.setEventListeners();

function renderCard(cardData, list) {
    const card = new Card({
        cardData,
        handleImageClick: (data) => {
            modalWithImage.open({ link, name });
            console.log(data);
        }
    }, '#card-template');
    list.prepend(card.getView());
}


// ==================================================================
//  Event Listeners
// ==================================================================

profileEditButton.addEventListener('click', () => {
    modalWithFormUser.open();
    modalNameInput.value = profileTitle.textContent;
    modalDescriptionInput.value = profileDescription.textContent;
});
cardAddButton.addEventListener('click', () => {
    modalWithFormImage.open();
});

// ==================================================================
//  Rendering cards from array
// ==================================================================
initialCards.forEach((cardData) => renderCard(cardData, cardListElement))


export {
    imageModal,
    modalCaptionElement,
    modalImageElement
};