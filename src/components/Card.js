export default class Card {
    constructor({ cardData, handleImageClick }, cardSelector) {
        this._cardData = cardData;
        this._name = cardData.name;
        this._link = cardData.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _setEventListeners() {
        const likeButton = this._elment.querySelector('.card__like-button');
        const deleteButton = this._elment.querySelector('.card__delete-button');

        likeButton.addEventListener('click', () => this._handleLikeIcon());
        deleteButton.addEventListener('click', () => this._handleDeleteIcon());

        this._cardImage.addEventListener("click", () => { this._handleImageClick(this._cardData) });

    }

    _handleLikeIcon() {
        this._elment.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    }
    _handleDeleteIcon() {
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
        return this._elment;
        // return the card
    }
}

