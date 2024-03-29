const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const productsRouter = require("./routes/products-routes");
const usersRouter = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(5000); // start Node + Express server on port 5000
  })
  .catch((err) => {
    console.log(err);
  });
