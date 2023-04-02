import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupEdit = document.querySelector('#edit-popup');
const popupAdd = document.querySelector('#add-popup');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElementEdit = document.forms['edit-form'];
const formElementAdd = document.forms['add-form'];
const newProfileName = popupEdit.querySelector('.popup__input_type_name');
const newDescription = popupEdit.querySelector('.popup__input_type_description');

const newPlace = popupAdd.querySelector('.popup__input_type_place');
const newLink = popupAdd.querySelector('.popup__input_type_link');

const listCloseButtons = document.querySelectorAll('.popup__close-button');   //все кнопки-"крестики" (закрытия)
const galleryContainer = document.querySelector('.gallery__list');

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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  activeButtonClass: 'popup__save-button_active',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible'
};

const editFormValidator = new FormValidator(validationConfig, formElementEdit);
const addFormValidator = new FormValidator(validationConfig, formElementAdd);

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
  editFormValidator.resetValidation();
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

const openPopupAdd = () => {       //функция открытия попапа "Новое место"
  openPopup(popupAdd);
  formElementAdd.reset();
  newPlace.placeholder = 'Название';
  newLink.placeholder = 'Ссылка на картинку';
  addFormValidator.resetValidation();
}

buttonAddCard.addEventListener('click', openPopupAdd);   //слушатель события, вызов функции открытия попапа "Новое место"

const handleAddFormSubmit = (evt) => {          //функция добавления карточки
  evt.preventDefault();
  renderCard({
    name: newPlace.value,
    link: newLink.value
  });
  closePopup(popupAdd);
  addFormValidator.disableSubmitButton();       //вызов метода disableSubmitButton() нового addFormValidator - делает кнопку неактивной
  formElementAdd.reset();
};

formElementAdd.addEventListener('submit', handleAddFormSubmit);   //слушатель события, вызов функции добавления карточки

function createCard(data) {      // ф-ция создания разметки карточки
  // тут создаем карточку и возвращаем ее
  const card = new Card(data, '.gallery__template_type_default');     // создаёт новый экземпляр класса Card
  const cardElement = card.generateCard();        // генерирует карточку и возвращает наружу
  return cardElement
}

const renderCard = (data) => {      // ф-ция создания и добавления карточки в DOM
  const cardElement = createCard(data);
  galleryContainer.prepend(cardElement);        // добавляет в DOM
}

initialCards.forEach(renderCard);        // цикл обходит массив initialCards ф-цией создания и добавления карточки в DOM

editFormValidator.enableValidation();       //вызов функции валидации
addFormValidator.enableValidation();

export { openPopup };