const Address = require("../models/Address");
const { addAddress, removeAddress } = require("./user");

const getAllAddresses = () => {
  return Address.find();
};

const getAddress = (id) => {
  return Address.findById(id);
};

const create = async (addressData, userId) => {
  const newAddress = Address({ ...addressData, user_id: userId });
  await newAddress.save();
  return addAddress(userId, newAddress._id);
};

const edit = (_id, addressData) => {
  return Address.findByIdAndUpdate(_id, addressData, { new: true });
};

const pop = async (addressId, userId) => {
  try {
    const test = await removeAddress(userId, addressId);
    return Address.findByIdAndDelete(addressId);
  } catch (err) {
    console.log(`err`, err);
    return err;
  }
};

module.exports = { getAllAddresses, getAddress, create, edit, pop };
