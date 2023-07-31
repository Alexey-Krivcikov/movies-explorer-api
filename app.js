require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/errorHandler");
const limiter = require("./middlewares/limiter");
const corsHandler = require("./middlewares/corsHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const {
  DB_DEV, PORT,
} = require("./utils/config");

const router = require("./routes/index");

const app = express();

mongoose.connect(DB_DEV, { useNewUrlParser: true });

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(corsHandler);

// Миддлвэры для парсинга
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
