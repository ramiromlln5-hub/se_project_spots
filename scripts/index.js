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
  const PostUrl = newPostUrl.value;
  const PostCaption = newPostCaption.value;

  console.log(PostUrl);
  console.log(PostCaption);
  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);
