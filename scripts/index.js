import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const disableSubmitButton = (buttonElement, config) => {       //функция делает кнопку неактивной
  buttonElement.classList.remove(config.activeButtonClass);
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};

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

const renderCard = (data) => {      // ф-ция создания и добавления карточки в DOM
  const card = new Card(data, '.gallery__template_type_default');     // создаёт новый экземпляр класса Card
  const cardElement = card.generateCard();        // генерирует карточку и возвращает наружу

  document.querySelector('.gallery__list').prepend(cardElement);        // добавляет в DOM
}

initialCards.forEach((data) => {        // цикл обходит массив initialCards
  renderCard(data);
});

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

editFormValidator.enableValidation();       //вызов функции валидации
addFormValidator.enableValidation();

export { openPopup };
