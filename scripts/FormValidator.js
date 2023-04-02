export default class FormValidator {        // создание класса FormValidator
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _showInputError(input) {          // метод показывает элемент ошибки под полем ввода
    this._errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = input.validationMessage;
    this._errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(input) {     // метод скрывает элемент ошибки под полем ввода
    this._errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    this._errorElement.classList.remove(this._config.errorClass);
    this._errorElement.textContent = '';
  }

  _checkInputValidity(input) {     // проверяет валидность поля и вызывает показать или скрыть элемент ошибки
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  disableSubmitButton() {     // делает кнопку Сохранить неактивной
    this._submitButton.classList.remove(this._config.activeButtonClass);
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableSubmitButton() {     // делает кнопку Сохранить активной
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.classList.add(this._config.activeButtonClass);
    this._submitButton.disabled = false;
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  _toggleButtonState() {     // метод для переключения кнопки "Сохранить" (активна-неактивна)
    this._hasInvalidInput = this._inputList.some(input => !input.validity.valid);
    if (this._hasInvalidInput) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));      //собирает в массив все инпуты
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);        //кнопка Сохранить
    this._inputList.forEach((input) => {         // цикл обходит массив инпутов
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
      this._toggleButtonState();
    });
  }

  enableValidation() {        //функция валидации
    this._setEventListeners();
  }

}     // конец класса FormValidator


