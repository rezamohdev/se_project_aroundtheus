import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
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

const cardData = {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
}

const imgcard = new Card(cardData, '#card-template');
imgcard.getView();

const profileEditButton = document.querySelector('#profile-edit-button');
const cardAddButton = document.querySelector('#profile-add-button');

// Modal
const profileModal = document.querySelector('#profile-modal');
const cardModal = document.querySelector('#card-modal');
const imageModal = document.querySelector('#image-modal');
const modalImageElement = document.querySelector('.modal__image');
const modalCaptionElement = document.querySelector('.modal__caption');

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

function handleEscape(e, modal) {
    if (e.key === "Escape") {
        closeModal(modal);
    }
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.modal_opened'); // find the opened popup
        closeModal(openedModal);
    }
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

const editFormValidator = new FormValidator(validationSettings, modalProfileForm);
const addFormValidator = new FormValidator(validationSettings, modalCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// -------------------------- functoins --------------------------------
function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageElement = cardElement.querySelector('.card__image');
    const cardTitleElement = cardElement.querySelector('.card__title');
    // const likeButton = cardElement.querySelector('.card__like-button');
    // const deleteButton = cardElement.querySelector('.card__delete-button');

    // likeButton.addEventListener('click', () => {
    //     likeButton.classList.toggle('card__like-button_active')
    // });

    // deleteButton.addEventListener('click', () => {
    //     cardElement.remove();
    // });
    cardTitleElement.textContent = cardData.name;
    cardImageElement.src = cardData.link;
    cardImageElement.alt = cardData.name;


    cardImageElement.addEventListener('click', (event) => {
        event.preventDefault();
        openModal(imageModal);
        modalCaptionElement.textContent = cardData.name;
        modalImageElement.src = cardData.link;
        modalImageElement.alt = cardData.name;
    });
    return cardElement;
}

function closeModal(modal) {
    modal.classList.remove('modal_opened');
    document.removeEventListener('keydown', closeByEscape)
}

function openModal(modal) {
    modal.classList.add('modal_opened');
    document.addEventListener('keydown', closeByEscape)


}

function renderCard(cardData, list) {
    const cardElement = getCardElement(cardData);
    list.prepend(cardElement);
}


// -------------------------- Event listeners --------------------------------

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

closeModalButton.addEventListener('click', () => closeModal(profileModal));
closeCardModalButton.addEventListener('click', () => closeModal(cardModal));
closeImageModalButton.addEventListener('click', () => closeModal(imageModal));

modalProfileForm.addEventListener('submit', handleProfileFormSubmit);
modalCardForm.addEventListener('submit', handleNewCardFormSubmit);

// ------------------------------ rendering cards from array ------------------------
initialCards.forEach((cardData) => renderCard(cardData, cardListElement))