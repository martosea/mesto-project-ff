export {enableValidation, clearValidation}

function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        setInputs(formElement, settings);
    });
};

function setInputs(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValid(formElement, inputElement, settings);
            setButtonState(formElement, buttonElement, settings);
        });
    });
}

function setButtonState(form, submitButton, settings){
    if (!form.checkValidity()) { 
        submitButton.disabled = true;
        submitButton.classList.add(settings.inactiveButtonClass);
    } else {
        submitButton.disabled = false;
        submitButton.classList.remove(settings.inactiveButtonClass);
    };
};

function clearValidation(form, settings)
{ 
    const inputsAll = form.querySelectorAll(settings.inputSelector);
    const submitButton = form.querySelector(settings.submitButtonSelector);
    
    setButtonState(form, submitButton, settings);

    inputsAll.forEach((input) => {
        hideInputError(form, input, settings);
    });
};

function getSuffix(length) {
    if (length === 1) return '';
    if (length > 1 && length < 5) return 'а';
    return 'ов';
}

function checkValid(formElement, inputElement, settings) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else if (inputElement.validity.tooShort) {
        inputElement.setCustomValidity(
            `Минимальное количество символов: ${inputElement.minLength}. Длина текста сейчас: ${inputElement.value.length} символ${getSuffix(inputElement.value.length)}.`
        );
    } else if (inputElement.validity.tooLong) {
        inputElement.setCustomValidity(
            `Максимальное количество символов: ${inputElement.maxLength}. Сейчас: ${inputElement.value.length} символ${getSuffix(inputElement.value.length)}.`
        );
    } else if (inputElement.validity.valueMissing) {
        inputElement.setCustomValidity("Вы пропустили это поле.");
    } else if (inputElement.type === "url" && inputElement.validity.typeMismatch) {
        inputElement.setCustomValidity("Введите адрес сайта.");
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
}


function showInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);

    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(settings.errorClass);
};

function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(settings.inputErrorClass);

    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
};
