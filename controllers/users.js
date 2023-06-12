const mongoose = require("mongoose");
// Импорт модулей bcryptjs и jsonwebtoken
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Импорт классов ошибок
const BadRequestError = require("../errors/bad-req-err");
const ConflictError = require("../errors/conflict-err");
const NotFoundError = require("../errors/not-found-err");
// Импорт модели User
const User = require("../models/user");
// Импорт переменных
const {
  LOGOUT_MESSAGE,
  LOGIN_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  USERID_ERROR_MESSAGE,
} = require("../utils/constants");

const { NODE_ENV, JWT_SECRET, JWT_SECRET_DEV } = require("../utils/config");
// Функция возвращает информацию о пользователе (email и имя)
module.exports.getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((user) => res.send(user))
    .catch(next);
};
// Функция обновляет информацию о пользователе (email и имя)
module.exports.updateUserInfo = (req, res, next) => {
  const { _id: userId } = req.user;
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    userId,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERROR_MESSAGE));
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(VALIDATION_ERROR_MESSAGE));
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(USERID_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};
// Функция регистрации, создаёт пользователя
module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERROR_MESSAGE));
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(VALIDATION_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};
// Функция аутентификации
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : JWT_SECRET_DEV,
        { expiresIn: "7d" },
      );
      res.cookie("jwt", token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: LOGIN_MESSAGE });
    })
    .catch(next);
};
// Функция выхода из профиля
module.exports.logout = (req, res) => {
  res.clearCookie("jwt").send({ message: LOGOUT_MESSAGE });
};
