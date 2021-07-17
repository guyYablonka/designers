const express = require("express");

const ordersController = require("../controllers/orders");

const router = express.Router();

router.get("/:id", ordersController.getOrderById);

router.post("/", ordersController.createOrder);

module.exports = router;
