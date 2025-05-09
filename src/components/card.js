export { createCard, likeCard, deleteCard };

const cardTemplate = document.querySelector('#card-template').content; 
const elementForClone = cardTemplate.querySelector('.places__item');

function createCard({
    cardInit, 
    deleteFunction, 
    onCardClickFunction, 
    likeFunction
    }
) {
    const cardElement = elementForClone.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = cardInit.name;
    const cardImage = cardElement.querySelector('.card__image')
    cardImage.src = cardInit.link;
    cardImage.alt = cardInit.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', (evt) => {
        deleteFunction(evt.target);
    });

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', (evt) => {
        likeFunction(evt.target);
    });

    cardImage.addEventListener('click', () =>
        onCardClickFunction(cardInit.name, cardInit.link));
    return cardElement;
}

function likeCard (likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
}

function deleteCard(delButton) {
    const listItem = delButton.closest('.card');
    listItem.remove()    
}












