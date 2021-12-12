const { getAllAddresses, create } = require("../services/address");

const getAll = async (req, res) => {
  try {
    const allAddresses = await getAllAddresses();
    res.status(200).send(allAddresses);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const insert = async (req, res) => {
  let { body } = req;
  body.user_id = req.user._id;
  try {
    const newAddress = await create(body);
    res.status(201).send(newAddress);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

module.exports = { getAll, insert };
