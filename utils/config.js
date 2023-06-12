const {
  NODE_ENV,
  PORT = 3000,
  JWT_SECRET,
} = process.env;

const DB_DEV = "mongodb://127.0.0.1:27017/bitfilmsdb";
const JWT_SECRET_DEV = "secret-key";

module.exports = {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  DB_DEV,
  JWT_SECRET_DEV,
};
