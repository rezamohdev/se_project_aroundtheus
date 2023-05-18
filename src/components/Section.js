export default class Section {
    constructor({ data, renderer }, cardSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(cardSelector);
    }

    addItem() {

    }
    renderItems() {

        this._renderedItems.forEach((item) => {
            this._renderer(item);

        });
    }
}