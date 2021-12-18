const {
  getAllProducts,
  create,
  edit,
  getSingleProduct,
  addComment,
} = require("../services/product");
const path = require("path");

const getAll = async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    res.status(200).send(allProducts);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const getOne = async (req, res) => {
  const { params } = req;
  try {
    const product = await getSingleProduct({ _id: params.id });
    res.status(200).send(product);
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

const update = async (req, res) => {
  const { params, body } = req;
  console.log(`params`, params, body);
  try {
    const updatedProduct = await edit(params.id, body);
    res.status(200).send(updatedProduct);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const addNewComment = async (req, res) => {
  //console.log(58, `req.user`, req.user);
  const { user, params, body } = req;
  console.log(`user._id,params.id, body`, user._id, params.id, body);
  try {
    console.log(61);
    const updatedProduct = await addComment(user._id, params.id, body);
    res.status(200).send(updatedProduct);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const addMedia = async (req, res) => {
  const { files, body, params } = req;
  try {
    const product = await getSingleProduct({ _id: params.id });
    if (!product)
      return res
        .status(404)
        .send({ message: "Böyle bir ürün bulunmamaktadır" });
    const extension = path.extname(req.files.file.name);
    const fileName = `${product._id?.toString()}${extension}`;
    const folderPath = path.join(
      __dirname,
      "../",
      "uploads/products",
      fileName
    );

    req.files.file.mv(folderPath, async (err) => {
      if (err) return res.status(400).send(err);
      const updatedProduct = await edit(params.id, { media: fileName });
      res.status(200).send(updatedProduct);
    });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

//! Delete
//? comment delete ?

module.exports = { getAll, getOne, insert, update, addNewComment, addMedia };
