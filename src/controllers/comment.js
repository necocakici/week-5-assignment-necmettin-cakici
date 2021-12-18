const { getAllComments, create } = require("../services/comment");

const getAll = async (req, res) => {
  try {
    const allComments = await getAllComments();
    res.status(200).send(allComments);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const insert = async (req, res) => {
  const { body } = req;
  try {
    const newComment = await create(body);
    res.status(201).send(newComment);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

//! Get One
//! Patch
//! Delete

module.exports = { getAll, insert };
