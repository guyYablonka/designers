const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  details: {
    availableGender: { type: Array, required: true },
    availableSizes: { type: Array, required: true },
    availableColors: { type: Array, required: true },
  },
  price: { type: Number, required: true },
  designer: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  rank: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: false },
  productType: { type: String, required: true },
  addedDate: { type: Date, required: true },
});

module.exports = mongoose.model("Product", productSchema);
