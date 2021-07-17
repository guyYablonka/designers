const uuid = require("uuid/v4");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Product = require("../models/product");

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

  console.log(createdProduct);

  try {
    await createdProduct.save();
  } catch (err) {
    const error = new HttpError(
      "Creating product failed, please try again.",
      500
    );

    return next(error);
  }

  res.status(201).json({ product: createdProduct });
};

exports.getProductById = getProductById;
exports.getAllProducts = getAllProducts;
exports.createProduct = createProduct;
