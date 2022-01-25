const User = require("../models/User");
const { cryptPassword } = require("../scripts/utils/helper");

//! MONGODB ATTRIBUTE MANTIĞI

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
    { new: true, safe: true, upsert: true, setDefaultsOnInsert: false }
  );
};

const removePhone = (_id, phoneId) => {
  //return User.update({"_id": ObjectId("5fbc52fb5f9a62418038240f")}, {$pull: {"model_year": 2018}})
  return User.findByIdAndUpdate(
    _id,
    { $pull: { phones: { _id: phoneId } } },
    { new: true }
  );
};

const addAddress = (_id, addressId) => {
  return User.findByIdAndUpdate(
    _id,
    { $push: { addresses: { _id: addressId } } },
    { new: true }
  );
};

const removeAddress = (userId, addressId) => {
  try {
    return User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: addressId } },
      { new: true }
    );
  } catch (err) {
    console.log(`error`, err);
    return err;
  }
};

const editPhones = async (_id, phoneId, phoneData) => {
  const user = await User.findOne({ _id, "phones._id": phoneId });
  const findUser = user.toJSON();
  const { phones } = findUser;
  const editPhone = phones.filter((el) => el._id == phoneId && el)[0];
  const newPhoneData = { ...editPhone, ...phoneData };
  return User.findOneAndUpdate(
    { _id, "phones._id": phoneId },
    { $set: { phones: newPhoneData } },
    { new: true }
  );
};

const resetPw = (email, newPassword) => {
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
  removePhone,
  editPhones,
  addAddress,
  removeAddress,
};
