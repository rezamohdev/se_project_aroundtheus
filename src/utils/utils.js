const closeModal = (modal) => {
    modal.classList.remove('modal_opened');
    document.removeEventListener('keydown', closeByEscape)
}

const openModal = (modal) => {
    modal.classList.add('modal_opened');
    document.addEventListener('keydown', closeByEscape)


}
const closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.modal_opened'); // find the opened popup
        closeModal(openedModal);
    }
}


export { closeModal, openModal, closeByEscape };