const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  adress: { type: String, required: true },
  phone: { type: String, required: true },
  isDesiner: { type: Boolean, required: true },
  registerDate: { type: Date, required: true },
  image: { type: String, required: true },
  creditCard: {
    number: { type: String, required: true },
    cvv: { type: String, required: true },
    expiredDate: { type: String, required: true },
  },
});

module.exports = mongoose.model("User", userSchema);
