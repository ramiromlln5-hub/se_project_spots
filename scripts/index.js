const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileClosedButton = editProfileModal.querySelector(
  ".modal__button-close"
);
const newPostModal = document.querySelector("#new-post-modal");
const newPostButton = document.querySelector(".profile__new-post-button");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostClosedButton = newPostModal.querySelector(".modal__button-close");
const newPostUrl = newPostModal.querySelector("#new-post-url");
const newPostCaption = newPostModal.querySelector("#new-post-caption");
const profileName = document.querySelector(".profile__name");
const profileJobTitle = document.querySelector(".profile__job-title");
const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__button-close_preview"
);
const previewImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-button_active");
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
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
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
}

editProfileButton.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileJobTitle.textContent;
  openModal(editProfileModal);
});

editProfileClosedButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostClosedButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJobTitle.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const postUrl = newPostUrl.value;
  const postCaption = newPostCaption.value;
  const cardElement = getCardElement({
    name: postCaption,
    link: postUrl,
  });
  cardsList.prepend(cardElement);
  evt.target.reset();

  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
