const popupEdit = document.querySelector('#edit-popup');
const popupTitleEdit = popupEdit.querySelector('.popup__title');
const popupAdd = document.querySelector('#add-popup');
const popupTitleAdd = popupAdd.querySelector('.popup__title');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const closeButtonEdit = popupEdit.querySelector('.popup__close-button');
const closeButtonAdd = popupAdd.querySelector('.popup__close-button');
const formElementEdit = popupEdit.querySelector('.popup__form');
const formElementAdd = popupAdd.querySelector('.popup__form');
const newProfileName = popupEdit.querySelector('.popup__text_type_name');
const newDescription = popupEdit.querySelector('.popup__text_type_description');

const newPlace = popupAdd.querySelector('.popup__text_type_place');
const newLink = popupAdd.querySelector('.popup__text_type_link');

const saveButtonEdit = popupEdit.querySelector('.popup__save-button');
const saveButtonAdd = popupAdd.querySelector('.popup__save-button');

function openPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
}

closePopup = (evt) => {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function openPopupEdit() {
    openPopup(popupEdit);
    popupTitleEdit.textContent = 'Редактировать профиль';
    newProfileName.value = profileName.textContent;
    newDescription.value = profileDescription.textContent;
}
editButton.addEventListener('click', openPopupEdit);

closeButtonEdit.addEventListener('click', closePopup);

function formSubmitHandlerEdit (evt) {
    evt.preventDefault();
    profileName.textContent = newProfileName.value;
    profileDescription.textContent = newDescription.value;
    closePopupEdit();
};

formElementEdit.addEventListener('submit', formSubmitHandlerEdit);

function openPopupAdd() {
  openPopup(popupAdd);
    popupTitleAdd.textContent = 'Новое место';
    newPlace.value = 'Название';
    newLink.value = 'Ссылка на картинку';
}
addButton.addEventListener('click', openPopupAdd);

closeButtonAdd.addEventListener('click', closePopup);

function formSubmitHandlerAdd (evt) {
    evt.preventDefault();
    renderCard({ name: newPlace.value,
    link: newLink.value });
    newPlace.value = '';
    newLink.value = '';
    closePopupAdd();
};

formElementAdd.addEventListener('submit', formSubmitHandlerAdd);


const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/Karachaevsk.jpg'
  },
  {
    name: 'Карачаев-Черкессия',
    link: './images/karachaevo-cherkes.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpg'
  },
  {
    name: 'Эльбрус',
    link: './images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/dombaj.jpg'
  },
  {
    name: 'Алтай',
    link: './images/altaj.jpg'
  }
];

const galleryContainer = document.querySelector('.gallery__list');

const galleryTemplate = document.querySelector('#gallery-template').content;

handlerAddLike = (evt) => {
  evt.target.classList.toggle('gallery__like_active');
}

handlerDelete = (evt) => {
  evt.target.closest('.gallery__element').remove();
}

const popupShow = document.querySelector('#show-popup');
const closeButtonShow = popupShow.querySelector('.popup__close-button');
const popupTitleShow = popupShow.querySelector('.popup__caption');
const popupPicture = popupShow.querySelector('.popup__picture');


const generateCard = (dataCard) => {
    const newCard = galleryTemplate.querySelector('.gallery__element').cloneNode(true);
    const newCardName = newCard.querySelector('.gallery__place-name');
    newCardName.textContent = dataCard.name;
    const newCardImg = newCard.querySelector('.gallery__picture');
    newCardImg.setAttribute('src', dataCard.link);
    
    function openPopupShow() {
      popupTitleShow.textContent = dataCard.name;
      popupPicture.setAttribute('src', dataCard.link);
      openPopup(popupShow);
    }

    newCardImg.addEventListener('click', openPopupShow);

    const likeButton = newCard.querySelector('.gallery__like');
    const deleteButton = newCard.querySelector('.gallery__trash');
    likeButton.addEventListener('click', handlerAddLike);
    deleteButton.addEventListener('click', handlerDelete);

    closeButtonShow.addEventListener('click', closePopup);

    return newCard;
}


const renderCard = (dataCard) => {
    galleryContainer.prepend(generateCard(dataCard));
}

initialCards.forEach((dataCard) => {
    renderCard(dataCard);
});
