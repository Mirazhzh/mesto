const popupEdit = document.querySelector('#edit-popup');
const popupAdd = document.querySelector('#add-popup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const closeButtonEdit = popupEdit.querySelector('.popup__close-button');
const closeButtonAdd = popupAdd.querySelector('.popup__close-button');
const formElementEdit = popupEdit.querySelector('.popup__form');
const formElementAdd = popupAdd.querySelector('.popup__form');
const newProfileName = popupEdit.querySelector('.popup__input_type_name');
const newDescription = popupEdit.querySelector('.popup__input_type_description');

const newPlace = popupAdd.querySelector('.popup__input_type_place');
const newLink = popupAdd.querySelector('.popup__input_type_link');

const saveButtonEdit = popupEdit.querySelector('.popup__save-button');
const saveButtonAdd = popupAdd.querySelector('.popup__save-button');

const closeButtons = document.querySelectorAll('.popup__close-button');

function handleCloseEsc(evt) { 
  if (evt.key === 'Escape') {
    const targetPopup = document.querySelector('.popup_opened')
    closePopup(targetPopup);
  }
};

function handleCloseOverlay(evt) { 
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

const openPopup = (targetPopup) => {
  targetPopup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseEsc);
}

const closePopup = (targetPopup) => {
  targetPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseEsc);
}

//document.addEventListener('keydown', handleCloseEsc);

document.addEventListener('click', handleCloseOverlay);

const openPopupEdit = () => {
    openPopup(popupEdit);
    newProfileName.value = profileName.textContent;
    newDescription.value = profileDescription.textContent;
}
editButton.addEventListener('click', openPopupEdit);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));

const handleEditFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = newProfileName.value;
    profileDescription.textContent = newDescription.value;
    closePopup(popupEdit);
};

formElementEdit.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', () => openPopup(popupAdd));

//closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));

const handleAddFormSubmit = (evt) => {
    evt.preventDefault();
    renderCard({ name: newPlace.value,
    link: newLink.value });
    newPlace.value = '';
    newLink.value = '';
    closePopup(popupAdd);
};

formElementAdd.addEventListener('submit', handleAddFormSubmit);


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

const handleAddLike = (evt) => {
  evt.target.classList.toggle('gallery__like_active');
}

const handleDelete = (evt) => {
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
    newCardImg.setAttribute('alt', dataCard.name);
    
    const openPopupShow = () => {
      popupTitleShow.textContent = dataCard.name;
      popupPicture.setAttribute('src', dataCard.link);
      popupPicture.setAttribute('alt', dataCard.name);
      openPopup(popupShow);
    }

    newCardImg.addEventListener('click', openPopupShow);

    const likeButton = newCard.querySelector('.gallery__like');
    const deleteButton = newCard.querySelector('.gallery__trash');
    likeButton.addEventListener('click', handleAddLike);
    deleteButton.addEventListener('click', handleDelete);

    //closeButtonShow.addEventListener('click', () => closePopup(popupShow));

    return newCard;
}


const renderCard = (dataCard) => {
    galleryContainer.prepend(generateCard(dataCard));
}

initialCards.forEach((dataCard) => {
    renderCard(dataCard);
});
