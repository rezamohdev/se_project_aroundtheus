export default class Card {
    constructor({ cardData, myId, handleImageClick, handleDeleteClick, handleLikeClick }, cardSelector) {
        this._cardData = cardData;
        this._myId = myId;
        this._name = cardData.name;
        this._link = cardData.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._likes = cardData.likes;
        this._owner = cardData.owner;
        this._id = cardData._id;
    }

    _setEventListeners() {
        this._likeButton = this._elment.querySelector('.card__like-button');
        this._deleteButton = this._elment.querySelector('.card__delete-button');
        this._likesAmount = this._elment.querySelector('.card__like-amount');
        this._likeButton.addEventListener('click', () => this._handleLikeClick());
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick());

        this._cardImage.addEventListener("click", () => { this._handleImageClick(this._cardData) });

    }
    getId() {
        return this._id;
    }
    isLiked() {
        return this._likes.some((like) => like._id === this._myId);
    }
    setLikes(likes) {
        this._likes = likes;
        this._handleLikeIcon();
        this.updateLikes();
    }
    updateLikes() {
        this._likesAmount.textContent = this._likes.length;
    }


    _handleLikeIcon() {
        if (this.isLiked()) {
            this._likeButton.classList.add('card__like-button_active');
        } else {
            this._likeButton.classList.remove('card__like-button_active');
        }
    }
    _checkCardOwner() {
        if (this._myId !== this._owner._id) {
            this._deleteButton.classList.add('card__delete-button-hidden');
        }
    }


    handleDeleteIcon() {
        this._elment.remove();
        this._elment = null;
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    }

    getView() {
        this._elment = this._getTemplate();
        this._cardImage = this._elment.querySelector('.card__image');
        this._cardTitle = this._elment.querySelector('.card__title');

        this._cardImage.src = this._link;
        this._cardTitle.textContent = this._name;
        this._cardImage.alt = this._name;

        // then set event listners
        this._setEventListeners();
        this.updateLikes();
        this._handleLikeIcon();
        this._checkCardOwner();
        return this._elment;
    }
}

