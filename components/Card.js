export default class Card {
    constructor({ name, link }, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _setEventListeners() {
        //     const likeButton = cardElement.querySelector('.card__like-button');
        const likeButton = this._cardElement.querySelector('.card__like-button');
        // const deleteButton = cardElement.querySelector('.card__delete-button');
        const deleteButton = this._cardElement.querySelector('.card__delete-button');

        likeButton.addEventListener('click', () => {
            console.log('clicked like button');
            this._handleLikeIcon();
        });
        deleteButton.addEventListener('click', function () {
            this._handleDeleteIcon();

        });
    }

    _handleLikeIcon() {
        this._cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    }
    _handleDeleteIcon() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    getView() {
        // I suppose the retrieve card view
        this._cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
        console.log(this._cardElement);
        // then set event listners
        this._setEventListeners();        // return the card
    }
}