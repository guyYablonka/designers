const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users");

const router = express.Router();

router.get("/", usersController.getAllUsers);

router.get("/:userId", usersController.getUserById);

router.post("/signup", usersController.addUser);

router.post("/login", usersController.connectUser);

router.patch(
  "/:userId",
  [
    check("username").not().isEmpty,
    check("email").not().isEmpty,
    check("adress").not().isEmpty,
    check("phone").not().isEmpty,
    check("image").not().isEmpty,
  ],
  usersController.updateUser
);

module.exports = router;
