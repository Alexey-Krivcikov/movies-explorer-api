const router = require("express").Router();
const userRouter = require("./users");
const movieRouter = require("./movies");

const auth = require("../middlewares/auth");

const NotFoundError = require("../errors/not-found-err");

const { createUser, login, logout } = require("../controllers/users");
const { createUserValidator, loginValidator } = require("../middlewares/validators/userValidator");

router.post("/signup", createUserValidator, createUser);
router.post("/signin", loginValidator, login);

router.use("/users", auth, userRouter);
router.use("/movies", auth, movieRouter);
router.get("/signout", auth, logout);

router.use("*", auth, (req, res, next) => {
  next(new NotFoundError("Ресурс не найден"));
});

module.exports = router;
