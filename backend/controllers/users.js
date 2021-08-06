const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "email and username");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject()) });
};

const getUserById = (req, res, next) => {
  const userId = req.params.userId;
  const user = User.findById(userId);

  if (!user) {
    return next(new HttpError("Could not find user by this id", 404));
  }

  res.json({ user });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(
      "Singing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Invalid credential could not log you in.",
      401
    );
    return next(error);
  }

  res.json({ message: "logged in!" });
};

const updateUser = (req, res, next) => {
  const errors = validationResult(req);

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

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { username, password, email, address, phone } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
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

  const createdUser = new User({
    username,
    email,
    password,
    address,
    phone,
    roles: "user",
    registerDate: new Date(),
  });

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
exports.connectUser = login;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
