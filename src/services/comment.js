const Comment = require("../models/Comment");

const getAllComments = () => {
  return Comment.find();
};

const create = (commentData) => {
  const newComment = Comment(commentData);
  return newComment.save();
};

module.exports = { getAllComments, create };
