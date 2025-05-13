import "../pages/index.css";
import { closeModal, openModal, setModalWindowEventListeners } from "../components/modal";
import { createCard, removeCard } from "../components/card";
import { enableValidation, clearValidation } from '../components/validation.js';
import {
    API_addOneMoreCard,
    API_changeUserInfo,
    API_deleteCard,
    API_getUsersMe,
    API_getCards,
    API_setAvatar
} from '../components/api.js';

let userMe;

const formEditProfile = document.querySelector('[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const descriptionInput = formEditProfile.querySelector('.popup__input_type_description');

const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const changeAvatarPopup = document.querySelector('.popup_type_change-avatar');
const changeAvatarForm = changeAvatarPopup.querySelector('form');
const avatarNewURLInput = changeAvatarPopup.querySelector('[name="new-avatar-url"]');

const formNewPlace = document.querySelector('[name="new-place"]');
const cardNameInput = formNewPlace.querySelector('[name="new-place-name"]');
const cardNewURLInput = formNewPlace.querySelector('[name="new-card-url"]');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const deleteCardPopup = document.querySelector('.popup_type_delete-card');
const deleteCardForm = document.querySelector('[name="delete-card"]');

const placesList = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');
const addForm = addPopup.querySelector('.popup__form');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

const popUps = document.querySelectorAll(".popup");

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

function beforeChangeAvatarPopupOpened() {
    avatarNewURLInput.value = '';
    clearValidation(changeAvatarForm, validationConfig);
}

function beforeNewCardPopupOpened() {
    cardNameInput.value = '';
    cardNewURLInput.value = '';
    clearValidation(addForm, validationConfig);
}

function beforeEditPopupOpened() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    clearValidation(formEditProfile, validationConfig);
}

function openCardPopup(title, link) {
    imagePopupImage.src = link;
    imagePopupImage.alt = title;
    imagePopupCaption.textContent = title;

    openModal(imagePopup, null);
}

function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();

    const newName = cardNameInput.value;
    const newLink = cardNewURLInput.value;

    const submitButton = evt.submitter;
    const originalTextContent = submitButton.textContent;
    submitButton.textContent = "Сохранение...";
    submitButton.disabled = true;

    API_addOneMoreCard(newName, newLink)
    .then(newCardFromServer => {
        renderCard({
            cardObject: newCardFromServer,
            userId: userMe._id
        });
            closeModal(addPopup);
            formNewPlace.reset();
        })
        .catch(err => {
            console.error("Ошибка при добавлении карточки:", err);
        })
        .finally(() => {
            submitButton.textContent = originalTextContent;
            submitButton.disabled = false;
        });
}

function renderCard({ cardObject, userId, method = "prepend" }) {
    placesList[method](
        createCard({
            cardObject,
            userId,
            deleteFunction: deleteCard,
            onCardClickFunction: openCardPopup
        })
    );
}


function showProfile() {
    profileTitle.textContent = userMe.name;
    profileDescription.textContent = userMe.about;
    profileImage.style.backgroundImage = `url(${userMe.avatar})`;
}

function submitDeleteCard(evt, cardElement, cardId) {
    evt.preventDefault();

    const submitButton = evt.submitter;
    const originalTextContent = submitButton.textContent;
    submitButton.textContent = "Удаление...";
    submitButton.disabled = true;

    API_deleteCard(cardId)
        .then(() => {
            removeCard(cardElement); 
            closeModal(deleteCardPopup);
        })
        .catch(err => {
            console.error('Ошибка при удалении карточки:', err);
        })
        .finally(() => {
            submitButton.textContent = originalTextContent;
            submitButton.disabled = false;
        });
}

function deleteCard(delButton, cardId) {
    const cardElement = delButton.closest('.card');
    openModal(deleteCardPopup, null);
    deleteCardForm.onsubmit = (evt) => submitDeleteCard(evt, cardElement, cardId);
}

Promise.all([API_getUsersMe(), API_getCards()])
    .then(([user, cardsArray]) => {
        userMe = user;
        showProfile();

        cardsArray.forEach(function (card) {
            renderCard({
                cardObject: card,
                userId: user._id,
                method: "append"
            });
        });

    })
    .catch((err) => {
        console.log(err);
    });

profileImage.addEventListener('click', () => openModal(changeAvatarPopup, beforeChangeAvatarPopupOpened));
addButton.addEventListener('click', () => openModal(addPopup, beforeNewCardPopupOpened));
editButton.addEventListener('click', () => openModal(editPopup, beforeEditPopupOpened));
formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);

changeAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const input = changeAvatarForm.querySelector('#input_avatar-image');
    const newAvatarUrl = input.value;

    const submitButton = evt.submitter;
    const originalTextContent = submitButton.textContent;
    submitButton.textContent = "Сохранение...";
    submitButton.disabled = true;

    API_setAvatar(newAvatarUrl)
        .then((updatedUser) => {
            profileImage.style.backgroundImage = `url(${updatedUser.avatar})`;
            closeModal(changeAvatarPopup);
            changeAvatarForm.reset();
        })
        .catch(err => {
            console.error('Ошибка при обновлении аватара:', err);
        })
        .finally(() => {
            submitButton.textContent = originalTextContent;
            submitButton.disabled = false;
        });
});

formEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newJob = descriptionInput.value;

    const submitButton = evt.submitter;
    const originalTextContent = submitButton.textContent;
    submitButton.textContent = "Сохранение...";
    submitButton.disabled = true;

    API_changeUserInfo(newName, newJob)
        .then((data) => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(editPopup);
        })
        .catch((err) => {
            console.error('Ошибка при обновлении профиля:', err);
        })
        .finally(() => {
            submitButton.textContent = originalTextContent;
            submitButton.disabled = false;
        });
});

popUps.forEach((ModalWindow) => { 
    setModalWindowEventListeners(ModalWindow); 
});

enableValidation(validationConfig);