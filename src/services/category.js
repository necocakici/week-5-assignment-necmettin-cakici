const Category = require("../models/Category");

const getAllCategories = () => {
  return Category.find();
};

const getCategory = (id) => {
  return Category.findById(id);
};

const create = (categoryData) => {
  const newCategory = Category(categoryData);
  return newCategory.save();
};

const edit = (_id, categoryData) => {
  return Category.findByIdAndUpdate(_id, categoryData, { new: true });
};

const pop = (_id) => {
  return Category.findByIdAndDelete(_id);
};

module.exports = {
  getAllCategories,
  getCategory,
  create,
  edit,
  pop,
};
