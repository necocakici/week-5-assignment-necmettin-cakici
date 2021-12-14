const User = require("../models/User");
const { cryptPassword } = require("../scripts/utils/helper");

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

const edit = (_id, userData) => {
  return User.findByIdAndUpdate(_id, userData, { new: true });
};

const addPhone = (_id, phoneData) => {
  return User.findByIdAndUpdate(
    _id,
    { $push: { phones: { number: phoneData.number, type: phoneData.type } } },
    { safe: true, upsert: true, setDefaultsOnInsert: false }
  );
};

const resetPw = (email, newPassword) => {
  console.log(`newPassword`, newPassword);
  return User.findOneAndUpdate(
    { email: email },
    {
      password: cryptPassword(newPassword),
    },
    {
      new: true,
    }
  );
};

module.exports = {
  getAllUsers,
  getSingleUser,
  create,
  edit,
  addPhone,
  resetPw,
};
