// Buttons
export const profileEditButton = document.querySelector('#profile-edit-button');
export const cardAddButton = document.querySelector('#profile-add-button');

// others
export const profileModalSelector = "#profile-modal";
export const cardModalSelector = '#card-modal';
export const imageModalSelector = '#image-modal';
export const userNameSelector = '#profile-title';
export const userDescriptionSelector = '#profile-description';
export const modalNameInputSelector = '#modal-name';
export const avatarSelector = '.profile__avatar';
export const modalDescriptionInputSelector = '#modal-description';
export const cardListSelector = '.gallery__cards';
export const cardDeleteModalSelector = '#card-delete-modal';
export const modalChangeProfileSelector = '#change-profile-modal';

// Modals
const profileModal = document.querySelector(profileModalSelector);
const cardModal = document.querySelector(cardModalSelector);
const imageModal = document.querySelector(imageModalSelector);
const changeProfileModal = document.querySelector(modalChangeProfileSelector);
const modalImageElement = document.querySelector('.modal__image');
const modalCaptionElement = document.querySelector('.modal__caption');


export const closeModalButton = document.querySelector('#modal-close');
export const closeCardModalButton = cardModal.querySelector('#card-modal-close');
export const closeImageModalButton = imageModal.querySelector('#image-modal-close');
export const profileTitle = document.querySelector(userNameSelector);
export const profileDescription = document.querySelector(userDescriptionSelector);
export const newCardTitle = cardModal.querySelector('#modal-title-input');
export const newCardUrl = cardModal.querySelector('#modal-url-input');
export const modalNameInput = document.querySelector(modalNameInputSelector);
export const modalDescriptionInput = document.querySelector(modalDescriptionInputSelector);
export const modalSubmitButton = document.querySelector('#modal-submit-button');
export const cardModalSubmitButton = document.querySelector('#card-modal-submit-button');
export const editButtonAvatart = document.querySelector('.profile__avatar-edit-button');
export const changeProfileModalSubmitButton = document.querySelector('#chnage-profile-modal-submit-button');
export const cardListElement = document.querySelector(cardListSelector);
export const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
// forms
export const modalProfileForm = profileModal.querySelector('.modal__form');
export const modalCardForm = cardModal.querySelector('.modal__form');
export const modalChangeProfileForm = changeProfileModal.querySelector('.modal__form');

export const validationSettings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__button_type_error",
    errorClass: "modal__error_visible"
};
