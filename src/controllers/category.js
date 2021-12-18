const {
  getAllCategories,
  getCategory,
  create,
  edit,
  pop,
} = require("../services/category");

const getAll = async (req, res) => {
  try {
    const allCategories = await getAllCategories();
    res.status(200).send(allCategories);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const getOne = async (req, res) => {
  const { params } = req;
  try {
    const category = await getCategory(params.id);
    res.status(200).send(category);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const update = async (req, res) => {
  const { params, body } = req;
  try {
    const updatedCategory = await edit(params.id, body);
    res.status(200).send(updatedCategory);
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

const remove = async (req, res) => {
  const { params } = req;
  try {
    const deletedCategory = await pop(params.id);
    res.status(200).send(deletedCategory);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

//! Get One
//! Patch
//! Delete

module.exports = { getAll, getOne, update, insert, remove };
