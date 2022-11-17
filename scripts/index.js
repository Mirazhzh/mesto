let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__form');
let newName = document.querySelector('.popup__text_type_name');
let newDescription = document.querySelector('.popup__text_type_description');
let saveButton = document.querySelector('.popup__save-button');

function openPopup() {
    popup.classList.add('popup_opened');
    newName.value = profileName.textContent;
    newDescription.value = profileDescription.textContent;
}
editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = newName.value;
    profileDescription.textContent = newDescription.value;
    closePopup();
};

formElement.addEventListener('submit', formSubmitHandler);



