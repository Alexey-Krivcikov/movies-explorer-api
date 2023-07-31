const mongoose = require("mongoose");
// Импорт модели User
const Movie = require("../models/movie");
// Импорт сообщений ошибок
const {
  VALIDATION_ERROR_MESSAGE,
  FILM_NOT_FOUND_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
} = require("../utils/constants");

// Импорт классов ошибок
const BadRequestError = require("../errors/bad-req-err");
const ForbiddenError = require("../errors/forbidden-err");
const NotFoundError = require("../errors/not-found-err");

// функция возвращает все сохранённые текущим  пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  const { _id: userId } = req.user;
  Movie.find({ owner: userId })
    .populate(["owner"])
    .then((movies) => res.send(movies))
    .catch(next);
};
// функция создаёт фильм
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const { _id: userId } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  }).then((movie) => movie.populate("owner"))
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(VALIDATION_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};
// функция удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  const { _id: movieId } = req.params;
  const { _id: userId } = req.user;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError(FILM_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((movie) => {
      if (movie.owner.toString() === userId) {
        return movie.deleteOne().then(() => res.send(movie));
      }
      throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE);
    })
    .catch(next);
};
