// Imports
import Card from "../components/Card.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/section.js";
import {
    initialCards,
    userNameSelector,
    userDescriptionSelector,
    imageModalSelector,
    profileModalSelector,
    cardModalSelector,
    cardListSelector,
    modalNameInput,
    modalDescriptionInput,
    cardListElement,
    modalProfileForm,
    modalCardForm,
    validationSettings,
    profileEditButton,
    cardAddButton,
    formValidators
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";

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
    popupSelector: cardModalSelector, handleFormSubmit: (inputValues) => {
        const name = inputValues.title;
        const link = inputValues.url;

        renderCard({ link, name }, cardListElement);

    }
});

const cardSection = new Section({
    data: initialCards,
    renderer: renderCard
}, cardListSelector);
cardSection.renderItems();

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// setting event listeners
modalWithFormUser.setEventListeners();
modalWithFormImage.setEventListeners();
modalWithImage.setEventListeners();

function renderCard(cardData) {
    const cardImage = createCard(cardData);
    cardSection.addItem(cardImage);
}

function createCard(cardData) {
    const card = new Card({
        cardData,
        handleImageClick: (data) => {
            modalWithImage.open(data);
        }
    }, '#card-template');
    return card.getView();
}

profileEditButton.addEventListener('click', () => {
    editFormValidator.resetValidation();
    modalWithFormUser.open();
    const userData = userInfo.getUserInfo();
    modalNameInput.value = userData.userName;
    modalDescriptionInput.value = userData.userDescription;
    // console.log(userData);

    // modalWithFormUser.setInputValues(userData);

});
cardAddButton.addEventListener('click', () => {
    addFormValidator.resetValidation();
    modalWithFormImage.open();
});

