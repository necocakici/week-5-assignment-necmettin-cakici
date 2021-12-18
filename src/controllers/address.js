const {
  getAllAddresses,
  getAddress,
  create,
  edit,
  pop,
} = require("../services/address");

const getAll = async (req, res) => {
  try {
    const allAddresses = await getAllAddresses();
    res.status(200).send(allAddresses);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const getOne = async (req, res) => {
  const { params } = req;
  try {
    const address = await getAddress(params.id);
    res.status(200).send(address);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const insert = async (req, res) => {
  const { body } = req;
  try {
    const newAddress = await create(body, req.user._id);
    res.status(201).send(newAddress);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const update = async (req, res) => {
  const { params, body } = req;
  try {
    const updatedAddress = await edit(params.id, body);
    res.status(200).send(updatedAddress);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const remove = async (req, res) => {
  const { params } = req;
  try {
    const deletedAdress = await pop(params.id, req.user._id);
    res.status(200).send(deletedAdress);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

//! Patch

module.exports = { getAll, getOne, insert, update, remove };
