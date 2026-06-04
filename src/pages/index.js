import "./index.css";
import Api from "../utils/Api.js";

import {
  enableValidation,
  settings,
  resetValidation,
  disableButtonElement,
} from "../scripts/validation.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "037ac09f-d486-4583-aaff-c1d62186d490",
    "Content-Type": "application/json",
  },
});

//destructure the second item in the callback of the .them()
api
  .getAppInfo()
  .then(([cards, user]) => {
    profileJobTitle.textContent = user.about;
    profileName.textContent = user.name;
    profileAvatarElement.src = user.avatar;
    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileClosedButton = editProfileModal.querySelector(
  ".modal__button-close",
);
const editProfileSubmitButton = editProfileModal.querySelector(
  ".modal__submit-button",
);
const avatarModal = document.querySelector("#avatar-modal");
const avatarSubmitButton = avatarModal.querySelector(".modal__submit-button");
const avatarCloseButton = avatarModal.querySelector(".modal__button-close");
const avatarButton = document.querySelector("#profile__avatar-button");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarForm = avatarModal.querySelector("#edit-avatar-form");
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteButtonSubmit = deleteModal.querySelector(
  ".modal__submit-button_delete",
);
const deleteCloseButton = deleteModal.querySelector(".modal__button-close");
const deleteCancelButton = deleteModal.querySelector(".modal__cancel-button");

const newPostModal = document.querySelector("#new-post-modal");
const newPostButton = document.querySelector(".profile__new-post-button");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostClosedButton = newPostModal.querySelector(".modal__button-close");
const newPostUrl = newPostModal.querySelector("#new-post-url");
const newPostCaption = newPostModal.querySelector("#new-post-caption");
const profileAvatarElement = document.querySelector(".profile__avatar");
const profileName = document.querySelector(".profile__name");
const profileJobTitle = document.querySelector(".profile__job-title");
const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__button-close_preview",
);
const previewImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const profileSubmitBtn = document.querySelector("#profile-name-submit-button");
const newPostSubmitBtn = document.querySelector("#new-post-submit-button");
let selectedCard;
let selectedCardId;

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

deleteCancelButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteCloseButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

function handleDeleteCard(cardElement, cardID) {
  selectedCard = cardElement;
  selectedCardId = cardID;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  deleteButtonSubmit.textContent = "Deleting...";
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      deleteButtonSubmit.textContent = "delete";
    });
}

function handleLike(evt, data) {
  const isLiked = data.isLiked;
  const id = data._id;
  //console.log(data._id);
  api
    .changeLikeStatus(id, isLiked)
    .then((data) => {
      evt.target.classList.toggle("card__like-button_active");
    })
    .catch(console.error);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  // • TODO - if the card is liked, set the active class on the
  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
  cardLikeBtnEl.addEventListener("click", (evt) => handleLike(evt, data));
  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-button_active");
  }
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data._id);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-open");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_is-open");
    if (openModal) {
      closeModal(openModal);
    }
  }
}
//profileAvatarElement.src = data.avatar;
// TODO finish handler
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      profileAvatarElement.src = data.avatar;

      evt.target.reset();
      disableButtonElement(avatarSubmitButton, settings);
      closeModal(avatarModal);
      // TODO - Make this work
    })
    .catch(console.error);
}

editProfileButton.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileJobTitle.textContent;
  openModal(editProfileModal);
});

editProfileClosedButton.addEventListener("click", function () {
  resetValidation(editProfileForm);
  closeModal(editProfileModal);
});

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostClosedButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

avatarButton.addEventListener("click", function () {
  openModal(avatarModal);

  avatarForm.addEventListener("submit", handleAvatarFormSubmit);
});

avatarCloseButton.addEventListener("click", function () {
  closeModal(avatarModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  editProfileSubmitButton.textContent = "Saving...";
  api
    .editUserInfo({
      name: profileNameInput.value,
      about: profileDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileJobTitle.textContent = data.about;
      evt.target.reset();
      disableButtonElement(profileSubmitBtn, settings);
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      editProfileSubmitButton.textContent = "Save";
    });
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  newPostSubmitBtn.textContent = "Saving...";
  const postUrl = newPostUrl.value;
  const postCaption = newPostCaption.value;
  const cardElement = getCardElement({
    name: postCaption,
    link: postUrl,
  });

  api
    .addCard({ name: postCaption, link: postUrl })
    .then(() => {
      cardsList.prepend(cardElement);
      evt.target.reset();
      disableButtonElement(newPostSubmitBtn, settings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      newPostSubmitBtn.textContent = "Save";
    });
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);
