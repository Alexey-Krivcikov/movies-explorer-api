const mongoose = require("mongoose");
const validator = require("validator");

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "Поле country должно быть заполнено"],
  },
  director: {
    type: String,
    required: [true, "Поле director должно быть заполнено"],
  },
  duration: {
    type: Number,
    required: [true, "Поле duration должно быть заполнено"],
  },
  year: {
    type: String,
    required: [true, "Поле year должно быть заполнено"],
  },
  description: {
    type: String,
    required: [true, "Поле description должно быть заполнено"],
  },
  image: {
    type: String,
    required: [true, "Поле image должно быть заполнено"],
    validate: {
      validator: (url) => validator.isURL(url),
      message: "Некорректный url",
    },
  },
  trailerLink: {
    type: String,
    required: [true, "Поле image должно быть заполнено"],
    validate: {
      validator: (url) => validator.isURL(url),
      message: "Некорректный url",
    },
  },
  thumbnail: {
    type: String,
    required: [true, "Поле image должно быть заполнено"],
    validate: {
      validator: (url) => validator.isURL(url),
      message: "Некорректный url",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "не передан _id пользователя"],
  },
  movieId: {
    type: Number,
    required: [true, "Поле movieId должно быть заполнено"],
  },
  nameRU: {
    type: String,
    required: [true, "Поле nameRU должно быть заполнено"],
  },
  nameEN: {
    type: String,
    required: [true, "Поле nameEN должно быть заполнено"],
  },
}, { versionKey: false });

module.exports = mongoose.model("movie", movieSchema);
