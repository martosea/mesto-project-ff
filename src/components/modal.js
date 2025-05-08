export {
    closePopup,
    openPopup
};

export const setModalWindowEventListeners = (modalWindow) => {
    modalWindow.classList.add("popup_is-animated");
    const closeCross = modalWindow.querySelector('.popup__close');
    closeCross.addEventListener('click', () => {closePopup(modalWindow);});
    modalWindow.addEventListener('click', (evt) => { 
        if (!evt.target.classList.contains(".popup__content")) {
            closePopup(evt.target);
        }
    });
};

function openPopup(popup, beforeFunction) {
    if (beforeFunction !== null) {
        beforeFunction();
    }
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        if (openedPopup) closePopup(openedPopup);
    }
}


