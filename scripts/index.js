const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const newName = document.querySelector('.popup__text_type_name');
const newDescription = document.querySelector('.popup__text_type_description');
const saveButton = document.querySelector('.popup__save-button');

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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/*const OneCards = {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  };*/

const galleryContainer = document.querySelector('.gallery__list');

const galleryTemplate = document.querySelector('#gallery-template').content;


/*const newCard = galleryTemplate.querySelector('.gallery__element').cloneNode(true);
newCard.querySelector('.gallery__place-name').textContent = OneCards.name;
const picture = newCard.querySelector('.gallery__picture').setAttribute('src', OneCards.link);
galleryContainer.prepend(newCard);
console.log(picture);*/


const generateCard = (dataCard) => {
    const newCard = galleryTemplate.querySelector('.gallery__element').cloneNode(true);
    newCard.querySelector('.gallery__place-name').textContent = dataCard.name;
    newCard.querySelector('.gallery__picture').setAttribute('src', dataCard.link);
    return newCard;
  }
  

const renderCard = (dataCard) => {
    galleryContainer.prepend(generateCard(dataCard));
}

initialCards.forEach((dataCard) => {
    renderCard(dataCard);
});
