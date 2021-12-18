const Comment = require("../models/Comment");
const Product = require("../models/Product");

const getAllProducts = () => {
  return Product.find()
    .populate({ path: "comments", select: "comment rate userId" })
    .populate({
      path: "user_id",
      select: "firstName email",
    })
    .populate({
      path: "categories",
      select: "name",
    });
};

const getSingleProduct = (where) => {
  return Product.findOne(where);
};

const create = (productData) => {
  console.log(`productData`, productData);
  const newProduct = Product(productData);
  return newProduct.save();
};

const edit = (_id, productData) => {
  return Product.findByIdAndUpdate(_id, productData, { new: true });
};

const addComment = async (userId, _id, commentData) => {
  const newComment = new Comment({
    ...commentData,
    productId: _id,
    userId: userId,
  });
  try {
    const createdComment = await newComment.save();
    const newCommentId = createdComment._id;
    return Product.findByIdAndUpdate(_id, {
      $push: { comments: { newCommentId } },
    });
  } catch (err) {
    console.log(`err`, err);
  }
  console.log(39);
};

module.exports = { getAllProducts, getSingleProduct, create, edit, addComment };
