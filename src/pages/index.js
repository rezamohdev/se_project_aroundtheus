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
    modalChangeProfileForm,
    validationSettings,
    profileEditButton,
    cardAddButton,
    changeProfileModalSubmitButton,
    cardDeleteModalSelector,
    modalChangeProfile,
    modalChangeProfileSelector,
    editButtonAvatart,
    avatarSelector
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
const changeProfileValidator = new FormValidator(validationSettings, modalChangeProfileForm);

const userInfo = new UserInfo({ userNameSelector, userDescriptionSelector, avatarSelector });

let userId;
api.getUserInfo().then(userData => {
    userId = userData._id;
    console.log(userData);
    userInfo.setUserInfo({
        title: userData.name,
        description: userData.about,
    });
    userInfo.setAvatartInfo(userData.avatar);
});


const modalWithImage = new PopupWithImage({ popupSelector: imageModalSelector });

const changeProfilePopup = new PopupWithForm({
    popupSelector: modalChangeProfileSelector,
    handleFormSubmit: (data) => {
        console.log(data);
        api.updateUserProfile({ avatar: data.url })
            .then(data => {
                console.log(data)
                userInfo.setAvatartInfo(data.avatar);
            });
    }
});

const modalWithFormUser = new PopupWithForm({
    popupSelector: profileModalSelector,
    handleFormSubmit: (data) => {
        api.userEditProfile(data);
    }
});

const confirmModal = new PopupWithForm({ popupSelector: cardDeleteModalSelector });

const modalWithFormImage = new PopupWithForm({
    popupSelector: cardModalSelector,
    handleFormSubmit: (data) => {
        api.addCard(data);
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
changeProfileValidator.enableValidation();

// setting event listeners
modalWithFormUser.setEventListeners();
modalWithFormImage.setEventListeners();
modalWithImage.setEventListeners();
confirmModal.setEventListeners();
changeProfilePopup.setEventListeners();


function createCard(cardData) {
    const card = new Card({
        cardData,
        myId: userId,
        handleImageClick: (data) => {
            modalWithImage.open(data);
        },
        handleDeleteClick: () => {
            confirmModal.open();
            confirmModal.setSubmitAction(() => {
                const id = card.getId();
                api.removeCard(id).then(res => console.log(res));
                card.handleDeleteIcon();
            })
        },
        handleLikeClick: () => {
            const id = card.getId();
            if (card.isLiked()) {
                api.unLikeCard(id).then((data) => {
                    card.setLikes(data.likes);
                });
            } else {
                api.likeCard(id).then((data) => {
                    card.setLikes(data.likes);
                });
            }

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
editButtonAvatart.addEventListener('click', () => {
    console.log('clicked');
    changeProfilePopup.open();
});

