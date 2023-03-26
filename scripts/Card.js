import { openPopup } from './index.js';

export default class Card {        // создание класса Card
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {        // метод для получение шаблона: забирет разметку из HTML и клонирует элемент
        const newCard = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.gallery__element')
            .cloneNode(true);

        return newCard;       // возвращает DOM-элемент карточки
    }

    _handleToggleLike() {         //метод для переключения лайков
        this._element.querySelector('.gallery__like').classList.toggle('gallery__like_active');
    }

    _handleDeleteCard() {         //метод для удаления карточки
        this._element.querySelector('.gallery__trash').closest('.gallery__element').remove();
    }

    _openPopupShow() {      //метод для открытия увеличенного фото из карточки
        this._popupShow = document.querySelector('#show-popup');
        this._popupTitleShow = this._popupShow.querySelector('.popup__caption');
        this._popupPicture = this._popupShow.querySelector('.popup__picture');

        this._popupTitleShow.textContent = this._name;
        this._popupPicture.setAttribute('src', this._link);
        this._popupPicture.setAttribute('alt', this._name);
        openPopup(this._popupShow);
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.gallery__like');     //кнопка лайк
        this._buttonDelete = this._element.querySelector('.gallery__trash');    //кнопка корзина
        this._likeButton.addEventListener('click', () => {      //слушатель нажатия на кнопку лайк
            this._handleToggleLike();
        });
        this._buttonDelete.addEventListener('click', () => {        //слушатель нажатия на кнопку корзина
            this._handleDeleteCard();
        });

        this._element.querySelector('.gallery__picture').addEventListener('click', () => {        //слушатель нажатия на карточку
            this._openPopupShow();
        });
    }

    generateCard() {
        this._element = this._getTemplate();      // записываем разметку в приватное поле _element
        this._setEventListeners();
        this._element.querySelector('.gallery__place-name').textContent = this._name;     //добавление названия
        this._element.querySelector('.gallery__picture').setAttribute('src', this._link);   //добавление картинки по ссылке
        this._element.querySelector('.gallery__picture').setAttribute('alt', this._name);   //добавление alt

        return this._element;     //возвращает наружу
    }

}     // конец класса Card

