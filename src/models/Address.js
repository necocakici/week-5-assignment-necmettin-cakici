const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fullAddress: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    country: String,
    province: String,
    code: String,
  },
  { timestamps: true, versionKey: false }
);

//Export the model
module.exports = mongoose.model("Address", addressSchema);
