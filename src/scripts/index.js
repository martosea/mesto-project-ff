import "../pages/index.css";
import { initialCards } from "../components/cards";
import { closeModal, openModal, setModalWindowEventListeners } from "../components/modal";
import { createCard, likeCard, deleteCard } from "../components/card";

const formEditProfile = document.querySelector('[name="edit-profile"]')
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formNewPlace = document.querySelector('[name="new-place"]')
const cardNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const urlInput = formNewPlace.querySelector('.popup__input_type_url');
const imagePopup =   document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');

initialCards.forEach(function (cardInit) {
    renderCard(cardInit, "append");
});

const addButton =  document.querySelector('.profile__add-button');
const addPopup =   document.querySelector('.popup_type_new-card');
addButton.addEventListener('click', () => openModal(addPopup, null));

const editButton =  document.querySelector('.profile__edit-button');
const editPopup =   document.querySelector('.popup_type_edit');
editButton.addEventListener('click', () => openModal(editPopup, beforeEditPopupOpened));

formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit); 

const popUps = document.querySelectorAll(".popup");
popUps.forEach(setModalWindowEventListeners);



function beforeEditPopupOpened() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value; 
    closeModal(editPopup);
}

formEditProfile.addEventListener('submit', handleEditFormSubmit); 

function openCardPopup( title, link) {
    popupImage.src = link;
    popupImage.alt = title;
    popupCaption.textContent = title;

    openModal(imagePopup, null);
}

function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();

    const newCard = {};
    newCard.name = cardNameInput.value;
    newCard.link =  urlInput.value
    renderCard(newCard);

    formNewPlace.reset();

    closeModal(addPopup);
}

function renderCard(item, method = "prepend") {
    placesList[ method ](
        createCard(
            {
                cardInit: item,
                deleteFunction : deleteCard,
                onCardClickFunction: openCardPopup,
                likeFunction: likeCard
            }
        )
    );
}



