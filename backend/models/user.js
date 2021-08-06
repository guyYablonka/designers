const mongoose = require("mongoose");
const uniqueValidatior = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  roles: { type: Array, required: true },
  registerDate: { type: Date, required: true },
  image: { type: String, required: false },
  creditCard: {
    number: { type: String, required: false },
    cvv: { type: String, required: false },
    expiredDate: { type: String, required: false },
  },
  orders: [{ type: mongoose.Types.ObjectId, required: false, ref: "Order" }],
  products: [
    { type: mongoose.Types.ObjectId, required: false, ref: "Product" },
  ],
});

userSchema.plugin(uniqueValidatior);

module.exports = mongoose.model("User", userSchema);
