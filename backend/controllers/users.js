const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

let USERS = [
  {
    id: "u1",
    username: "guy_yablonka",
    email: "guy@gmail.com",
    password: "1234",
    adress: "Petah Tikva, Tor Azahav 35",
    phone: "0509845887",
    roles: ["user", "admin", "designer"],
    registerDate: "12/10/2020",
    image:
      "https://image.cnbcfm.com/api/v1/image/100496736-steve-jobs-march-2011-getty.jpg?v=1513863842&w=1400&h=950",
    craditCard: {
      number: "fdfdfdfd",
      cvv: "123",
      expiredDate: "12/32",
    },
    orders: [],
    products: [],
  },
];

const getAllUsers = (req, res, next) => {
  const users = User.find();
  if (!users) {
    return next(new HttpError("Could not find users", 404));
  }
  res.json(users);
};

const getUserById = (req, res, next) => {
  const userId = req.params.userId;
  const user = User.findById(userId);

  if (!user) {
    return next(new HttpError("Could not find user by this id", 404));
  }

  res.json({ user });
};

const connectUser = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Singing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = HttpError("Invalid credential could not log you in.", 401);
    return next(error);
  }

  res.json({ message: "logged in!" });
};

const updateUser = (req, res, next) => {
  const error = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { username, email, password, adress, phone, image } = req.body;

  const userId = req.params.userId;

  const updatedUser = { ...USERS.find((user) => (user.id = userId)) };
  const userIndex = USERS.findIndex((user) => user.id === userId);

  updatedUser.username = username;
  updatedUser.email = email;
  updatedUser.password = password;
  updatedUser.adress = adress;
  updatedUser.phone = phone;
  updatedUser.image = image;

  USERS[userIndex] = updatedUser;

  res.status(200).json({ user: updatedUser });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { username, password, email } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Singing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdUser = new User(USERS[0]);

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Creating user failed, please try again.", 500);

    return next(error);
  }

  res.status(201).json({ user: createdUser });
};

exports.signup = signup;
exports.updateUser = updateUser;
exports.connectUser = connectUser;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
