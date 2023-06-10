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
    avatarSelector
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

// instantiating card objects
const editFormValidator = new FormValidator(validationSettings, modalProfileForm);
const addFormValidator = new FormValidator(validationSettings, modalCardForm);
const changeProfileValidator = new FormValidator(validationSettings, modalChangeProfileForm);

const userInfo = new UserInfo({ userNameSelector, userDescriptionSelector, avatarSelector });

let cardInstance;
let userId;
api.getUserInfo().then(userData => {
    userId = userData._id;
    userInfo.setUserInfo({
        title: userData.name,
        description: userData.about,
    });
    userInfo.setAvatartInfo(userData.avatar);
}).catch((err) => {
    console.error(err);
});;

const modalWithImage = new PopupWithImage({ popupSelector: imageModalSelector });

const changeProfilePopup = new PopupWithForm({
    popupSelector: modalChangeProfileSelector,
    handleFormSubmit: (data) => {
        api.updateUserProfile({ avatar: data.url })
            .then(data => {
                userInfo.setAvatartInfo(data.avatar);
            }).catch((err) => console.error(err));
    },
    loadingText: "Saving..."
});

const modalWithFormUser = new PopupWithForm({
    popupSelector: profileModalSelector,
    handleFormSubmit: (data) => {
        modalWithFormUser.renderLoading(true);
        api.userEditProfile(data).then((data) => {
            userInfo.setUserInfo({
                title: data.name,
                description: data.about
            });
            userInfo.setAvatartInfo(data.avatar);
        }).catch(err => { console.error(err); }).finally(() => {

            modalWithFormUser.renderLoading(false);
        });
    },
    loadingText: "Saving..."
});

const confirmModal = new PopupWithForm({
    handleFormSubmit: () => {
        confirmModal.renderLoading(true);
    },
    popupSelector: cardDeleteModalSelector,

    loadingText: "Deleting..."
});

const modalWithFormImage = new PopupWithForm({
    popupSelector: cardModalSelector,
    handleFormSubmit: (data) => {
        console.log(data);
        modalWithFormImage.renderLoading(true);
        api.addCard(data)
            .then((data) => {
                renderCard(data);
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                modalWithFormImage.renderLoading(false);
            });
    },
    loadingText: "Saving..."
});

function renderCard(cardData) {
    const cardImage = createCard(cardData);
    cardInstance.prependItem(cardImage);
}

api.getInitialCards()
    .then((cardData) => {
        cardInstance = new Section({
            data: cardData,
            renderer: renderCard
        }, cardListSelector);
        cardInstance.renderItems();
    }).catch((err) => { console.error(err); });


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
                api.removeCard(id)
                    .catch((err) => {
                        console.error(err);
                    }).finally(() => {
                        confirmModal.renderLoading(false);
                    });
                card.handleDeleteIcon();
            })
        },
        handleLikeClick: () => {
            const id = card.getId();
            if (card.isLiked()) {
                api.unLikeCard(id).then((data) => {
                    card.setLikes(data.likes);
                }).catch((err) => console.error(err));
            } else {
                api.likeCard(id).then((data) => {
                    card.setLikes(data.likes);
                }).catch((err) => console.error(err));
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
    changeProfilePopup.open();
});

