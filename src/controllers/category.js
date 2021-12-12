const { getAllCategories, create } = require("../services/category");

const getAll = async (req, res) => {
  try {
    const allCategories = await getAllCategories();
    res.status(200).send(allCategories);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const insert = async (req, res) => {
  const { body } = req;
  try {
    const newCategory = await create(body);
    res.status(201).send(newCategory);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

module.exports = { getAll, insert };
