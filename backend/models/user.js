const mongoose = require("mongoose");
const uniqueValidatior = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false, minLength: 6 },
  adress: { type: String, required: true },
  phone: { type: String, required: true },
  roles: { type: Array, required: true },
  registerDate: { type: Date, required: true },
  image: { type: String, required: false },
  creditCard: {
    number: { type: String, required: true },
    cvv: { type: String, required: true },
    expiredDate: { type: String, required: true },
  },
  orders: { type: Array, required: true },
  products: { type: Array, required: false },
});

userSchema.plugin(uniqueValidatior);

module.exports = mongoose.model("User", userSchema);
