const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true, versionKey: false }
);

//Export the model
module.exports = mongoose.model("Category", categorySchema);
