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
    isDesiner: true,
    registerDate: "12/10/2020",
    image:
      "https://image.cnbcfm.com/api/v1/image/100496736-steve-jobs-march-2011-getty.jpg?v=1513863842&w=1400&h=950",
  },
];

const getAllUsers = (req, res, next) => {
  if (!USERS) {
    return next(new HttpError("Could not find users", 404));
  }
  res.json({ users: USERS });
};

const getUserById = (req, res, next) => {
  const userId = req.params.userId;
  const user = USERS.find((user) => {
    return user.id === userId;
  });

  if (!user) {
    return next(new HttpError("Could not find user by this id", 404));
  }

  res.json(user);
};

const connectUser = (req, res, next) => {
  const { username, password } = req.body;

  const identifiedUser = USERS.find((user) => user.username === username);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Could not identify user.", 401);
  }

  res.json({ message: "logged in!" });
};

const addUser = (req, res, next) => {
  const {
    username,
    email,
    password,
    adress,
    phone,
    isDesiner,
    registerDate,
    image,
  } = req.body;

  const createdUser = {
    id: uuid(),
    username,
    email,
    password,
    adress,
    phone,
    isDesiner,
    registerDate,
    image,
  };

  USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
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

exports.updateUser = updateUser;
exports.connectUser = connectUser;
exports.addUser = addUser;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
