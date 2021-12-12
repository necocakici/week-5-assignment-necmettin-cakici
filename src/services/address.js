const Address = require("../models/Address");

const getAllAddresses = () => {
  return Address.find();
};

const create = (addressData) => {
  const newAddress = Address(addressData);
  return newAddress.save();
};

module.exports = { getAllAddresses, create };
