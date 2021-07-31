const uuid = require("uuid/v4");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Order = require("../models/order");
const User = require("../models/user");

const getOrderById = async (req, res, next) => {
  const orderId = req.params.id;
  let order;
  try {
    order = await Order.findById(orderId);
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong, could not find a order.",
      500
    );
    return next(error);
  }

  if (!order) {
    return next(
      new HttpError("Could not find orders by the provided id.", 404)
    );
  }

  res.json({ order });
};

const createOrder = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { products, userOrder, price } = req.body;

  const createdOrder = new Order({
    products,
    userOrder,
    price,
    date: new Date(),
  });

  let user;
  try {
    user = await User.findById(userOrder);
  } catch (err) {
    const error = new HttpError(
      "Creating product failed, please try again",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for Provided id", 404);
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdOrder.save({ session: session });
    user.orders.push(createdOrder);
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating product failed, please try again.",
      500
    );

    return next(error);
  }

  res.status(201).json({ order: createdOrder });
};

exports.getOrderById = getOrderById;
exports.createOrder = createOrder;
