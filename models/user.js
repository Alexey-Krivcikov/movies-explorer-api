const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const AuthenticationError = require("../errors/auth-err");

const { AUTHENTICATION_ERROR_MESSAGE } = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Поле email должно быть заполнено"],
      unique: [true, "Поле email должно быть уникальным"],
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "Некорректный email",
      },
    },
    name: {
      type: String,
      require: [true, "Поле name должно быть заполнено"],
      minlength: [2, "Минимальная длина поля name - 2"],
      maxlength: [30, "Максимальная длина поля name - 30"],
    },
    password: {
      type: String,
      require: [true, "Поле password должно быть заполнено"],
      select: false, // БД не вернет это поле по умолчанию
    },
  }, // отключаем поле "__v"
  { toJSON: { useProjection: true }, toObject: { useProjection: true }, versionKey: false },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthenticationError(AUTHENTICATION_ERROR_MESSAGE));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthenticationError(AUTHENTICATION_ERROR_MESSAGE));
          }
          return user;
        });
    });
};

module.exports = mongoose.model("user", userSchema);
