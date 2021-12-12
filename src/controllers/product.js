const { getAllProducts, create } = require("../services/product");

const getAll = async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    res.status(200).send(allProducts);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const insert = async (req, res) => {
  let { body } = req;
  console.log(`req.user`, req.user);
  //console.log(`req`, req);
  body.user_id = req.user._id;
  try {
    const newProduct = await create(body);
    res.status(201).send(newProduct);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

module.exports = { getAll, insert };
