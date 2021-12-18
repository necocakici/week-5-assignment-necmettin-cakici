const express = require("express");
const app = express();
//const helmet = require("helmet");
const path = require("path");
const fileUpload = require("express-fileupload");

const config = require("./config");
const loaders = require("./loaders");

const {
  userRoutes,
  addressRoutes,
  categoryRoutes,
  productRoutes,
  commentRoutes,
} = require("./routes");
const { authToken } = require("./middlewares/auth");
const { checkAdminAuthToken } = require("./middlewares/checkAdminAuth");

config();
loaders();

app.use(
  "/product-images",
  express.static(path.join(__dirname, "./", "uploads/products"))
);
app.use(express.json());
app.use(fileUpload());

app.use("/users", userRoutes);
app.use("/addresses", addressRoutes);
app.use("/products", productRoutes);
app.use("/categories", checkAdminAuthToken, categoryRoutes);
app.use("/comments", commentRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.APP_PORT}!`);
});
