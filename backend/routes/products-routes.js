const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/", productsController.getAllProducts);

router.get("/:productId", productsController.getProductById);

router.post("/", productsController.createProduct);

module.exports = router;
