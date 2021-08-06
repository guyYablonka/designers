const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users");

const router = express.Router();

router.get("/", usersController.getAllUsers);

router.get("/:userId", usersController.getUserById);

router.post(
  "/signup",
  [check("username").not().isEmpty(), check("password").isLength({ min: 6 })],
  usersController.signup
);

router.post(
  "/login",
  [check("username").not().isEmpty(), check("password").isLength({ min: 6 })],
  usersController.connectUser
);

router.patch(
  "/:userId",
  [
    check("username").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("adress").not().isEmpty(),
    check("phone").not().isEmpty(),
  ],
  usersController.updateUser
);

module.exports = router;
