var CryptoJS = require("crypto-js");
const mongoose = require("mongoose"); // Erase if already required
const { cryptPassword } = require("../scripts/utils/helper");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    phones: [{ number: { type: String }, type: { type: String } }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  this.password = cryptPassword(this.password);
});

//Export the model
module.exports = mongoose.model("User", userSchema);
