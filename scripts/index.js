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

const profileEditButton = document.querySelector('#profile-edit-button');
const profileModal = document.querySelector('#profile-modal');
const closeModal = document.querySelector('#modal-close');
const profileTitle = document.querySelector('#profile-title');
const profileDescription = document.querySelector('#profile-description');
const modalNameInput = document.querySelector('#modal-name');
const modalDescriptionInput = document.querySelector('#modal-description');
const modalSubmitButton = document.querySelector('#modal-submit-button');
const cardListElement = document.querySelector('.gallery__cards');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;

const modalProfileForm = profileModal.querySelector('.modal__form');



// -------------------------- event handlers --------------------------------
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = modalNameInput.value;
    profileDescription.textContent = modalDescriptionInput.value;
    closePopup();
}

function handleProfileEditButton() {
    modalNameInput.value = profileTitle.textContent;
    modalDescriptionInput.value = profileDescription.textContent;
    profileModal.classList.add('modal_opened');
}

// -------------------------- functoins --------------------------------
function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageElement = cardElement.querySelector('.card__image');
    const cardTitleElement = cardElement.querySelector('.card__title');
    cardTitleElement.textContent = cardData.name;
    cardImageElement.setAttribute('src', cardData.link);
    cardImageElement.setAttribute('alt', cardData.name);
    return cardElement;
}

function closePopup() {
    profileModal.classList.remove('modal_opened');
}


// -------------------------- Event listeners --------------------------------

profileEditButton.addEventListener('click', handleProfileEditButton);

closeModal.addEventListener('click', closePopup);


modalProfileForm.addEventListener('submit', handleProfileFormSubmit);

// ------------------------------ rendering cards from array ------------------------
initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardListElement.append(cardElement);
})