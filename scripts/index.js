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

const listCloseButtons = document.querySelectorAll('.popup__close-button');

const popupShow = document.querySelector('#show-popup');
const popupTitleShow = popupShow.querySelector('.popup__caption');
const popupPicture = popupShow.querySelector('.popup__picture');

function handleCloseEsc(evt) {      //функция закрытия по кнопке Esd
  if (evt.key === 'Escape') {
    const targetPopup = document.querySelector('.popup_opened')
    closePopup(targetPopup);
  }
};

function handleCloseOverlay(evt) {        //функция закрытия по клику на оверлэй
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

const openPopup = (targetPopup) => {        //функция открытия попапа
  targetPopup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseEsc);
}

const closePopup = (targetPopup) => {        //функция закрытия попапа
  targetPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseEsc);
}

const openPopupEdit = () => {
  openPopup(popupEdit);
  newProfileName.value = profileName.textContent;
  newDescription.value = profileDescription.textContent;
}
buttonEditProfile.addEventListener('click', openPopupEdit);

listCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('mousedown', handleCloseOverlay);
});

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = newProfileName.value;
  profileDescription.textContent = newDescription.value;
  closePopup(popupEdit);
};

formElementEdit.addEventListener('submit', handleEditFormSubmit);

buttonAddCard.addEventListener('click', () => openPopup(popupAdd));

const handleAddFormSubmit = (evt) => {          //функция добавления карточки
  evt.preventDefault();
  renderCard({
    name: newPlace.value,
    link: newLink.value
  });
  closePopup(popupAdd);
  inactiveButton(buttonSaveAdd, validationConfig);
  formElementAdd.reset();
};

formElementAdd.addEventListener('submit', handleAddFormSubmit);

const handleToggleLike = (evt) => {       //функция переключения лайков
  evt.target.classList.toggle('gallery__like_active');
}

const handleDelete = (evt) => {         //функция для удаления карточки
  evt.target.closest('.gallery__element').remove();
}

const galleryContainer = document.querySelector('.gallery__list');
const galleryTemplate = document.querySelector('#gallery-template').content;
// тут всё, что можно было, вынесено за пределы функции

const generateCard = (dataCard) => {
  const newCard = galleryTemplate.querySelector('.gallery__element').cloneNode(true);
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
  buttonDelete.addEventListener('click', handleDelete);

  return newCard;
}

const renderCard = (dataCard) => {
  galleryContainer.prepend(generateCard(dataCard));
}

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});