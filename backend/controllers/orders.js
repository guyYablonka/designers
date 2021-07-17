const uuid = require("uuid/v4");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Order = require("../models/order");

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

  const { products, userId, price } = req.body;

  const createdOrder = new Order({
    products,
    userId,
    price,
    date: new Date(),
  });

  try {
    await createdOrder.save();
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
