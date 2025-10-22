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
let newPostUrl = newPostModal.querySelector("#new-post-url");
let newPostCaption = newPostModal.querySelector("#new-post-caption");
const profileName = document.querySelector(".profile__name");
const profileJobTitle = document.querySelector(".profile__job-title");
const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

editProfileButton.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileJobTitle.textContent;
  editProfileModal.classList.add("modal_is-open");
});

editProfileClosedButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-open");
});

newPostButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-open");
});

newPostClosedButton.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-open");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJobTitle.textContent = profileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-open");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  newPostUrl = newPostUrl.value;
  newPostCaption = newPostCaption.value;

  console.log(newPostUrl);
  console.log(newPostCaption);
  newPostModal.classList.remove("modal_is-open");
}

newPostForm.addEventListener("submit", handleNewPostSubmit);
