export {
    API_addOneMoreCard,
    API_changeUserInfo,
    API_deleteCard,
    API_getUsersMe,
    API_getCards,
    API_setLikeCard,
    API_setAvatar
};

const secretConfig = {
    cohortUrl: 'https://mesto.nomoreparties.co/v1/cohort-mag-4',
    headers: {
        authorization: '6ef3fe21-7ea0-4fdd-ab22-b97dc0eb5ac0',
        'Content-Type': 'application/json'
    }
};

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return res.json().then(errData => {
        return Promise.reject(new Error(`Error ${res.status}: ${JSON.stringify(errData)}`));
    });
}

function API_getUsersMe() {
    return fetch(`${secretConfig.cohortUrl}/users/me`, {
        headers: secretConfig.headers
    }).then(handleResponse);
}

function API_getCards() {
    return fetch(`${secretConfig.cohortUrl}/cards`, {
        headers: secretConfig.headers
    }).then(handleResponse);
}

function API_changeUserInfo(newName, newJob) {
    return fetch(`${secretConfig.cohortUrl}/users/me`, {
        method: 'PATCH',
        headers: secretConfig.headers,
        body: JSON.stringify({
            name: newName,
            about: newJob
        })
    }).then(handleResponse);
}

function API_addOneMoreCard(newName, newLink) {
    return fetch(`${secretConfig.cohortUrl}/cards`, {
        method: 'POST',
        headers: secretConfig.headers,
        body: JSON.stringify({
            name: newName,
            link: newLink
        })
    }).then(handleResponse);
}

function API_setLikeCard(cardId, isLiked) {
    return fetch(`${secretConfig.cohortUrl}/cards/likes/${cardId}`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: secretConfig.headers
    }).then(handleResponse);
}

function API_deleteCard(cardId) {
    return fetch(`${secretConfig.cohortUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: secretConfig.headers
    }).then(handleResponse);
}

function API_setAvatar(avatarUrl) {
    return fetch(`${secretConfig.cohortUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: secretConfig.headers,
        body: JSON.stringify({ avatar: avatarUrl })
    }).then(handleResponse);
}
