const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var commentSchema = new mongoose.Schema(
  {
    comment: String,
    rate: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true, versionKey: false }
);

//Export the model
module.exports = mongoose.model("Comment", commentSchema);
