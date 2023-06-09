require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const {
  DB_DEV, PORT,
} = require("./utils/config");

const router = require("./routes/index");

const app = express();

mongoose.connect(DB_DEV, { useNewUrlParser: true });

// Миддлвэры для парсинга
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT);
