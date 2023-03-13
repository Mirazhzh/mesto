const popupEdit = document.querySelector('#edit-popup');
const popupAdd = document.querySelector('#add-popup');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElementEdit = popupEdit.querySelector('.popup__form');
const formElementAdd = popupAdd.querySelector('.popup__form');
const newProfileName = popupEdit.querySelector('.popup__input_type_name');
const newDescription = popupEdit.querySelector('.popup__input_type_description');
const buttonSaveAdd = popupAdd.querySelector('.popup__save-button');

const newPlace = popupAdd.querySelector('.popup__input_type_place');
const newLink = popupAdd.querySelector('.popup__input_type_link');

const listCloseButtons = document.querySelectorAll('.popup__close-button');   //все кнопки-"крестики" (закрытия)

const popupShow = document.querySelector('#show-popup');
const popupTitleShow = popupShow.querySelector('.popup__caption');
const popupPicture = popupShow.querySelector('.popup__picture');

function handleCloseEsc(evt) {      //общая функция закрытия по кнопке Esd
  if (evt.key === 'Escape') {
    const targetPopup = document.querySelector('.popup_opened')
    closePopup(targetPopup);
  }
};

function handleCloseOverlay(evt) {        //общая функция закрытия по клику на оверлэй
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

const openPopup = (targetPopup) => {        //общая функция открытия попапа
  targetPopup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseEsc);
}

const closePopup = (targetPopup) => {        //общая функция закрытия попапа
  targetPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseEsc);
}

const openPopupEdit = () => {       //функция открытия попапа "Редактировать профиль"
  openPopup(popupEdit);
  newProfileName.value = profileName.textContent;
  newDescription.value = profileDescription.textContent;
}
buttonEditProfile.addEventListener('click', openPopupEdit);   //слушатель события, вызов функции открытия попапа "Редактировать профиль"

listCloseButtons.forEach((button) => {      //функция для закрытия всех попапов при нажатии на кнопку-"крестик"
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('mousedown', handleCloseOverlay);
});

const handleEditFormSubmit = (evt) => {     //функция изменения профиля по введённым данным
  evt.preventDefault();
  profileName.textContent = newProfileName.value;
  profileDescription.textContent = newDescription.value;
  closePopup(popupEdit);
};

formElementEdit.addEventListener('submit', handleEditFormSubmit);     //слушатель события "submit" и вызов функции для изменения профиля

buttonAddCard.addEventListener('click', () => openPopup(popupAdd));   //слушатель события, вызов функции открытия попапа "Новое место"

const handleAddFormSubmit = (evt) => {          //функция добавления карточки
  evt.preventDefault();
  renderCard({
    name: newPlace.value,
    link: newLink.value
  });
  closePopup(popupAdd);
  disableSubmitButton(buttonSaveAdd, validationConfig);
  formElementAdd.reset();
};

formElementAdd.addEventListener('submit', handleAddFormSubmit);   //слушатель события, вызов функции добавления карточки

const handleToggleLike = (evt) => {       //функция переключения лайков
  evt.target.classList.toggle('gallery__like_active');
}

const handleDeleteCard = (evt) => {         //функция для удаления карточки
  evt.target.closest('.gallery__element').remove();
}

const galleryContainer = document.querySelector('.gallery__list');
const galleryTemplate = document.querySelector('#gallery-template').content.querySelector('.gallery__element');

const generateCard = (dataCard) => {      //функция генерации карточки
  const newCard = galleryTemplate.cloneNode(true);
  const newCardName = newCard.querySelector('.gallery__place-name');
  newCardName.textContent = dataCard.name;
  const newCardImg = newCard.querySelector('.gallery__picture');
  newCardImg.setAttribute('src', dataCard.link);
  newCardImg.setAttribute('alt', dataCard.name);

  const openPopupShow = () => {
    popupTitleShow.textContent = dataCard.name;
    popupPicture.setAttribute('src', dataCard.link);
    popupPicture.setAttribute('alt', dataCard.name);
    openPopup(popupShow);
  }

  newCardImg.addEventListener('click', openPopupShow);

  const likeButton = newCard.querySelector('.gallery__like');
  const buttonDelete = newCard.querySelector('.gallery__trash');
  likeButton.addEventListener('click', handleToggleLike);
  buttonDelete.addEventListener('click', handleDeleteCard);

  return newCard;
}

const renderCard = (dataCard) => {
  galleryContainer.prepend(generateCard(dataCard));
}

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});