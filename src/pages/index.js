// Imports
import Card from "../components/Card.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/section.js";
import {
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
    avatarSelector,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../utils/API.js"
const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
        authorization: "9eeac52f-491b-4cc6-8ef1-69498b3521ca",
        "Content-Type": "application/json"
    }
});

const formValidators = {}

// enable validation
const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(validationSettings, formElement)

        const formName = formElement.getAttribute('name')

        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(validationSettings);

const userInfo = new UserInfo({ userNameSelector, userDescriptionSelector, avatarSelector });

let sectionInstance;
let userId;
api.getAppInfo()
    .then(([userData, cardData]) => {
        // set all the data
        userId = userData._id;
        userInfo.setUserInfo({
            title: userData.name,
            description: userData.about
        });
        userInfo.setAvatartInfo(userData.avatar);
        sectionInstance = new Section({
            data: cardData,
            renderer: renderCard
        }, cardListSelector);
        sectionInstance.renderItems();
    })
    .catch(console.error);

const modalWithImage = new PopupWithImage({ popupSelector: imageModalSelector });

const changeProfilePopup = new PopupWithForm({
    popupSelector: modalChangeProfileSelector,
    handleFormSubmit: (data) => {
        changeProfilePopup.renderLoading(true);
        api.updateUserProfile({ avatar: data.url })
            .then(data => {
                userInfo.setAvatartInfo(data.avatar);
                changeProfilePopup.close();
            }).catch(console.error).finally(() => {
                changeProfilePopup.renderLoading(false);
            });
    },
    loadingText: "Saving..."
});

const modalWithFormUser = new PopupWithForm({
    popupSelector: profileModalSelector,
    handleFormSubmit: (data) => {
        modalWithFormUser.renderLoading(true);
        api.userEditProfile(data)
            .then((data) => {
                userInfo.setUserInfo({
                    title: data.name,
                    description: data.about
                });
                userInfo.setAvatartInfo(data.avatar);
                modalWithFormUser.close();
            }).catch(console.error).finally(() => {
                modalWithFormUser.renderLoading(false);
            });
    },
    loadingText: "Saving..."
});

const confirmModal = new PopupWithForm({
    popupSelector: cardDeleteModalSelector,
    loadingText: "Deleting..."
});

const modalWithFormImage = new PopupWithForm({
    popupSelector: cardModalSelector,
    handleFormSubmit: (data) => {
        modalWithFormImage.renderLoading(true);
        api.addCard(data)
            .then((data) => {
                renderCard(data);
                modalWithFormImage.close();
            }).catch(console.error).finally(() => {
                modalWithFormImage.renderLoading(false);
            });
    },
    loadingText: "Saving..."
});

function renderCard(cardData) {
    const cardImage = createCard(cardData);
    sectionInstance.prependItem(cardImage);
}

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
                confirmModal.renderLoading(true);
                const id = card.getId();
                api.removeCard(id)
                    .then(() => {
                        card.handleDeleteIcon();
                        confirmModal.close();
                    })
                    .catch(console.error).finally(() => {
                        confirmModal.renderLoading(false);
                    });
            })
        },
        handleLikeClick: () => {
            const id = card.getId();
            if (card.isLiked()) {
                api.unLikeCard(id).then((data) => {
                    card.setLikes(data.likes);
                }).catch(console.error);
            } else {
                api.likeCard(id).then((data) => {
                    card.setLikes(data.likes);
                }).catch(console.error);
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
    formValidators['editProfileModalForm'].resetValidation();
});
cardAddButton.addEventListener('click', () => {
    formValidators['cardModalForm'].resetValidation();
    modalWithFormImage.open();
});
editButtonAvatart.addEventListener('click', () => {
    formValidators['changeAvatarModalForm'].resetValidation();
    changeProfilePopup.open();
});