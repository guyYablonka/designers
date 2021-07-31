const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/", productsController.getAllProducts);

router.get("/:id", productsController.getProductById);

router.post("/add", productsController.createProduct);

router.post("/delete", productsController.deleteProduct);

module.exports = router;
