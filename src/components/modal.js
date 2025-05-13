export {
    closeModal,
    openModal
};

export const setModalWindowEventListeners = (modalWindow) => {
    modalWindow.classList.add("popup_is-animated");
    const closeCross = modalWindow.querySelector('.popup__close');
    closeCross.addEventListener('click', () => {closeModal(modalWindow);});
    modalWindow.addEventListener('click', (evt) => { 
        if (evt.target.classList.contains("popup")) {
            closeModal(modalWindow);
        }
    });
};

function openModal(popup, beforeFunction) {
    if (beforeFunction !== null) {
        beforeFunction();
    }
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscClose);
}

function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        if (openedPopup) closeModal(openedPopup);
    }
}

