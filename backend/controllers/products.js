const uuid = require("uuid/v4");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Product = require("../models/product");
const User = require("../models/user");
const mongoose = require("mongoose");

const getAllProducts = async (req, res, next) => {
  const allProducts = Product.find();
  if (!allProducts) {
    return next(new HttpError("Could not find products", 404));
  }

  res.json(allProducts);
};

const getProductById = async (req, res, next) => {
  const productId = req.params.id;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!product) {
    return next(
      new HttpError("Could not find products by the provided id.", 404)
    );
  }

  res.json({ product });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    name,
    details,
    price,
    designer,
    rank,
    image,
    description,
    productType,
  } = req.body;

  const createdProduct = new Product({
    name,
    details,
    price,
    designer,
    rank,
    image,
    description,
    productType,
    addedDate: new Date(),
  });

  let user;
  try {
    user = await User.findById(designer);
  } catch (err) {
    const error = HttpError("Creating product failed, please try again!", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for Provided id", 404);
    return next(error);
  }
  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProduct.save({ session: sess });
    user.products.push(createdProduct);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating product failed, please try again.",
      500
    );

    return next(error);
  }

  res.status(201).json({ product: createdProduct });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId).populate("designer");
  } catch (err) {
    const error = HttpError(
      "Somthing went wrong, could not delete product.",
      500
    );
    return next(error);
  }

  if (!product) {
    const error = HttpError("Could not findd product by place id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await product.remove({ session: sess });
    product.designer.products.pull(product);
    await product.desinger.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = HttpError(
      "Somthing went wrong, could not delete product.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted product." });
};

exports.getProductById = getProductById;
exports.getAllProducts = getAllProducts;
exports.createProduct = createProduct;
exports.deleteProduct = deleteProduct;
