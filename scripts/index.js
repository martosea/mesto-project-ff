const placeList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const elementClone = cardTemplate.querySelector('.places__item');

function createCard(cardInit, deleteFunction) {
    const cardElement = elementClone.cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardInit.name;
    cardElement.querySelector('.card__image').src = cardInit.link;
    cardElement.querySelector('.card__image').alt = cardInit.name;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteFunction);

    return cardElement;
}

function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

function renderCard(item, method = "prepend") {
    placeList[ method ] (createCard(item, deleteCard));
}

initialCards.forEach(function (cardInit) {
    renderCard(cardInit, "append");
});