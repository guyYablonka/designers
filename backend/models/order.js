const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [{ type: mongoose.Types.ObjectId, required: true, ref: "product" }],
  userOrder: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
