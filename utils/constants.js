const UNAUTHORIZED_ERROR_MESSAGE = "С токеном что-то не так";
const AUTHENTICATION_ERROR_MESSAGE = "Неправильные почта или пароль";
const VALIDATION_ERROR_MESSAGE = "Некорректные данные";
const FORBIDDEN_ERROR_MESSAGE = "Нет прав доступа";
const FILM_NOT_FOUND_ERROR_MESSAGE = "Фильм не найден";
const USER_NOT_FOUND_ERROR_MESSAGE = "Пользователь не найден";
const CONFLICT_ERROR_MESSAGE = "Такой пользователь уже существует";
const USERID_ERROR_MESSAGE = "Некорректный Id пользователя";
const LOGIN_MESSAGE = "Авторизация успешна";
const LOGOUT_MESSAGE = "Выход из профиля";
const SERVER_ERROR_MESSAGE = "На сервере произошла ошибка";

const regex = /https?:\/\/w{0,3}\.?[\w0-9-]{1,10}\.\w{2,3}[\w\d\-._~:/?#[\]@!$&'()*+,;=]{0,}/m;
module.exports = {
  AUTHENTICATION_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  FILM_NOT_FOUND_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  USERID_ERROR_MESSAGE,
  LOGIN_MESSAGE,
  LOGOUT_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  regex,
};
