const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileClosedButton = editProfileModal.querySelector(
  ".modal__button-close"
);
const newPostModal = document.querySelector("#new-post-modal");
const newPostButton = document.querySelector(".profile__new-post-button");
const newPostClosedButton = newPostModal.querySelector(".modal__button-close");

editProfileButton.addEventListener("click", function () {
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
