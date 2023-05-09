// Imports
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
    openModal,
    closeModal
} from "../utils/utils.js";
// Card dats
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
const profileModal = document.querySelector('#profile-modal');
const cardModal = document.querySelector('#card-modal');
const imageModal = document.querySelector('#image-modal');
const modalImageElement = document.querySelector('.modal__image');
const modalCaptionElement = document.querySelector('.modal__caption');

// others
const closeModalButton = document.querySelector('#modal-close');
const closeCardModalButton = cardModal.querySelector('#card-modal-close');
const closeImageModalButton = imageModal.querySelector('#image-modal-close');
const profileTitle = document.querySelector('#profile-title');
const profileDescription = document.querySelector('#profile-description');
const newCardTitle = cardModal.querySelector('#modal-title-input');
const newCardUrl = cardModal.querySelector('#modal-url-input');
const modalNameInput = document.querySelector('#modal-name');
const modalDescriptionInput = document.querySelector('#modal-description');
const modalSubmitButton = document.querySelector('#modal-submit-button');
const cardModalSubmitButton = document.querySelector('#card-modal-submit-button');
const cardListElement = document.querySelector('.gallery__cards');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;



// forms
const modalProfileForm = profileModal.querySelector('.modal__form');
const modalCardForm = cardModal.querySelector('.modal__form');


// -------------------------- event handlers --------------------------------
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = modalNameInput.value;
    profileDescription.textContent = modalDescriptionInput.value;
    closeModal(profileModal);
}

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const name = newCardTitle.value;
    const link = newCardUrl.value;
    renderCard({ name, link }, cardListElement);
    modalCardForm.reset();

    cardModalSubmitButton.disabled = true;
    cardModalSubmitButton.classList.add('modal__button_disabled');

    closeModal(cardModal);
}
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
editFormValidator.enableValidation();
addFormValidator.enableValidation();

function renderCard(cardData, list) {
    const card = new Card(cardData, '#card-template');
    list.prepend(card.getView());
}

// ==================================================================
//  Event Listeners
// ==================================================================

profileEditButton.addEventListener('click', () => {
    openModal(profileModal)
    modalNameInput.value = profileTitle.textContent;
    modalDescriptionInput.value = profileDescription.textContent;
});
cardAddButton.addEventListener('click', () => openModal(cardModal));


profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) {
        closeModal(profileModal);
    }
});

imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeModal(imageModal);
    }
});

cardModal.addEventListener('click', (e) => {
    if (e.target === cardModal) {
        closeModal(cardModal);
    }
});

// Listening to events
closeModalButton.addEventListener('click', () => closeModal(profileModal));
closeCardModalButton.addEventListener('click', () => closeModal(cardModal));
closeImageModalButton.addEventListener('click', () => closeModal(imageModal));

modalProfileForm.addEventListener('submit', handleProfileFormSubmit);
modalCardForm.addEventListener('submit', handleNewCardFormSubmit);

// ==================================================================
//  Rendering cards from array
// ==================================================================
initialCards.forEach((cardData) => renderCard(cardData, cardListElement))


export {
    imageModal,
    modalCaptionElement,
    modalImageElement
};