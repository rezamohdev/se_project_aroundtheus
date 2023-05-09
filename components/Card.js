export default class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _setEventListeners() {
        const likeButton = this._elment.querySelector('.card__like-button');
        const deleteButton = this._elment.querySelector('.card__delete-button');
        const modalImageElement = document.querySelector('.modal__image');
        const modalCaptionElement = document.querySelector('.modal__caption');
        const imageModal = document.querySelector('#image-modal');



        likeButton.addEventListener('click', () => this._handleLikeIcon());
        deleteButton.addEventListener('click', () => this._handleDeleteIcon());

        this._cardImage.addEventListener("click", (e) => this._handlePrveviewImage(e));

    }

    _handleLikeIcon() {
        this._elment.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    }
    _handleDeleteIcon() {
        this._elment.remove();
        this._elment = null;
    }
    _handlePrveviewImage(e) {
        e.preventDefault();
        this._openModal(imageModal);
        modalCaptionElement.textContent = cardData.name;
        modalImageElement.src = cardData.link;
        modalImageElement.alt = cardData.name; _elment
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    }
    _closeModal(modal) {
        modal.classList.remove('modal_opened');
        document.removeEventListener('keydown', closeByEscape)
    }

    _openModal(modal) {
        modal.classList.add('modal_opened');
        document.addEventListener('keydown', closeByEscape)


    }

    getView() {
        this._elment = this._getTemplate();
        this._cardImage = this._elment.querySelector('.card__image');
        this._cardTitle = this._elment.querySelector('.card__title');


        this._cardImage.src = this._link;
        this._cardTitle.textContent = this._name;

        // then set event listners
        this._setEventListeners();
        return this._elment;
        // return the card
    }
}

