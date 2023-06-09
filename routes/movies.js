const movieRouter = require("express").Router();

const { Router } = require("express");
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require("../controllers/movies");

const {
  movieDataValidator,
  movieIdValidator,
} = require("../middlewares/validators/movieValidator");

movieRouter.get("/", getMovies);
movieRouter.post("/", movieDataValidator, createMovie);
movieRouter.delete("/:_id", movieIdValidator, deleteMovie);

module.exports = movieRouter;
