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

function openPopupEdit() {
    popupEdit.classList.add('popup_opened');
    popupTitleEdit.textContent = 'Редактировать профиль';
    newProfileName.value = profileName.textContent;
    newDescription.value = profileDescription.textContent;
}
editButton.addEventListener('click', openPopupEdit);

function closePopupEdit() {
    popupEdit.classList.remove('popup_opened');
}
closeButtonEdit.addEventListener('click', closePopupEdit);

function formSubmitHandlerEdit (evt) {
    evt.preventDefault();
    profileName.textContent = newProfileName.value;
    profileDescription.textContent = newDescription.value;
    closePopupEdit();
};

formElementEdit.addEventListener('submit', formSubmitHandlerEdit);

function openPopupAdd() {
    popupAdd.classList.add('popup_opened');
    popupTitleAdd.textContent = 'Новое место';
    newPlace.value = 'Название';
    newLink.value = 'Ссылка на картинку';
}
addButton.addEventListener('click', openPopupAdd);

function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
}
closeButtonAdd.addEventListener('click', closePopupAdd);

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
    link: '/images/altaj.jpeg'
  }
];

const galleryContainer = document.querySelector('.gallery__list');

const galleryTemplate = document.querySelector('#gallery-template').content;

/*handlerAddLike = (evt) => {
  evt.target.classList.toggle('gallery__like_active');
}

handlerDelete = (evt) => {
  evt.target.closest('.gallery__element').remove();
}*/


const generateCard = (dataCard) => {
    const newCard = galleryTemplate.querySelector('.gallery__element').cloneNode(true);
    newCard.querySelector('.gallery__place-name').textContent = dataCard.name;
    newCard.querySelector('.gallery__picture').setAttribute('src', dataCard.link);

    /*const likeButton = newCard.querySelector('.gallery__like');
    const deleteButton = newCard.querySelector('.gallery__trash');
    likeButton.addEventListener('click', handlerAddLike);
    deleteButton.addEventListener('click', handlerDelete);

    const bigPicButton = newCard.querySelector('.gallery__picture');
    const popupShow = document.querySelector('#show-popup');
    const closeButtonShow = popupShow.querySelector('.popup__close-button');
    const popupTitleShow = popupShow.querySelector('.popup__caption');
    popupTitleShow.textContent = dataCard.name;
    const popupPicture = popupShow.querySelector('.popup__picture');
    popupPicture.setAttribute('src', dataCard.link);

    bigPicButton.addEventListener('click', openPopupShow);
    closeButtonShow.addEventListener('click', closePopupShow);

    function openPopupShow() {
      popupShow.classList.add('popup_opened');
    }
    
    function closePopupShow() {
    popupShow.classList.remove('popup_opened');
    }*/

    return newCard;
}


const renderCard = (dataCard) => {
    galleryContainer.prepend(generateCard(dataCard));
}

initialCards.forEach((dataCard) => {
    renderCard(dataCard);
});