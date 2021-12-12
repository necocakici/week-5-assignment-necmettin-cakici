const Product = require("../models/Product");

const getAllProducts = () => {
  return Product.find();
};

const create = (productData) => {
  console.log(`productData`, productData);
  const newProduct = Product(productData);
  return newProduct.save();
};

module.exports = { getAllProducts, create };
