const showInputError = (formElement, inputElement, errorMsg) => {
  const errorMsgID = inputElement.id + "-error";
  const errorMsgEl = formElement.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = errorMsg;
  inputElement.classList.add(settings.inputErrorClass);
};

const hideInputError = (formElement, inputElement, errorMsg) => {
  const errorMsgID = inputElement.id + "-error";
  const errorMsgEl = formElement.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = errorMsg;
  inputElement.classList.remove(settings.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, inputElement.validationMessage);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

const disableButtonElement = (buttonElement, settings) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(settings.inactiveButtonClass);
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector),
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector,
  );

  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function resetValidation(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector),
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector,
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });

  toggleButtonState(inputList, buttonElement);
}

function enableValidation() {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error",
};

enableValidation(settings);
