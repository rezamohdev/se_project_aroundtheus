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
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/API.js"
const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
        authorization: "9eeac52f-491b-4cc6-8ef1-69498b3521ca",
        "Content-Type": "application/json"
    }

});

// instantiating card objects
const editFormValidator = new FormValidator(validationSettings, modalProfileForm);
const addFormValidator = new FormValidator(validationSettings, modalCardForm);

const userInfo = new UserInfo({ userNameSelector, userDescriptionSelector });
api.getUserInfo().then(res => console.log(res));

api.getUserInfo().then(userData => {
    userInfo.setUserInfo({
        title: userData.name,
        description: userData.about
    });
});


const modalWithImage = new PopupWithImage({ popupSelector: imageModalSelector });

const modalWithFormUser = new PopupWithForm({
    popupSelector: profileModalSelector,
    handleFormSubmit: (data) => {
        // userInfo.setUserInfo(data);
        api.getUserInfo().then(userData => {
            userInfo.setUserInfo({
                title: userData.name,
                description: userData.about
            });
        });
    }
});

const modalWithFormImage = new PopupWithForm({
    popupSelector: cardModalSelector,
    handleFormSubmit: (data) => {
        api.addCard(data).then(data => {
            console.log(data);
            // renderCard(data, cardListElement);
        });
        //     const name = inputValues.title;
        //     const link = inputValues.url;




    }
});
api.getInitialCards().then((cardData) => {
    console.log(cardData);
    const cardSection = new Section({
        data: cardData,
        renderer: renderCard
    }, cardListSelector);
    cardSection.renderItems();
    function renderCard(cardData) {
        const cardImage = createCard(cardData);
        cardSection.addItem(cardImage);
    }
});



editFormValidator.enableValidation();
addFormValidator.enableValidation();

// setting event listeners
modalWithFormUser.setEventListeners();
modalWithFormImage.setEventListeners();
modalWithImage.setEventListeners();



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
    modalWithFormUser.open();
    const userData = userInfo.getUserInfo();
    modalNameInput.value = userData.userName;
    modalDescriptionInput.value = userData.userDescription;
    editFormValidator.resetValidation();
});
cardAddButton.addEventListener('click', () => {
    addFormValidator.resetValidation();
    modalWithFormImage.open();
});

