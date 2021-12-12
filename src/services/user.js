const User = require("../models/User");

const getAllUsers = () => {
  return User.find();
};

const getSingleUser = (where) => {
  return User.findOne(where);
};

const create = (userData) => {
  const newUser = User(userData);
  return newUser.save();
};

module.exports = { getAllUsers, getSingleUser, create };
