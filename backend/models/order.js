const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: { type: Array, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
