const express = require("express");
const app = express();
//const helmet = require("helmet");

const config = require("./config");
const loaders = require("./loaders");

const {
  userRoutes,
  addressRoutes,
  categoryRoutes,
  productRoutes,
} = require("./routes");
const { authToken } = require("./middlewares/auth");
const { checkAdminAuthToken } = require("./middlewares/checkAdminAuth");

config();
loaders();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/addresses", addressRoutes);
app.use("/products", productRoutes);
app.use("/categories", checkAdminAuthToken, categoryRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.APP_PORT}!`);
});
