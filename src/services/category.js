const Category = require("../models/Category");

const getAllCategories = () => {
  return Category.find();
};

const create = (categoryData) => {
  const newCategory = Category(categoryData);
  return newCategory.save();
};

module.exports = { getAllCategories, create };
