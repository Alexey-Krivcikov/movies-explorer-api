const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET, JWT_SECRET_DEV } = require("../utils/config");

const AuthenticationError = require("../errors/auth-err");

const { UNAUTHORIZED_ERROR_MESSAGE } = require("../utils/constants");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AuthenticationError(UNAUTHORIZED_ERROR_MESSAGE));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    return next(new AuthenticationError(UNAUTHORIZED_ERROR_MESSAGE));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};
