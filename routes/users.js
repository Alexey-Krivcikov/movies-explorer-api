const userRouter = require("express").Router();

const {
  getCurrentUser,
  updateUserInfo,
} = require("../controllers/users");

const {
  userDataValidator,
} = require("../middlewares/validators/userValidator");

userRouter.get("/me", getCurrentUser);
userRouter.patch("/me", userDataValidator, updateUserInfo);

module.exports = userRouter;
