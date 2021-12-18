const express = require("express");
const {
  getAll,
  insert,
  update,
  getOne,
  addMedia,
  addNewComment,
} = require("../controllers/product");
const { checkAdminAuthToken } = require("../middlewares/checkAdminAuth");
const { authToken } = require("../middlewares/auth");
const router = express.Router();
/*
const { validate } = require("../middlewares/validate");
const { createValidation } = require("../validations/Users");*/

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", checkAdminAuthToken, insert);
router.patch("/:id", checkAdminAuthToken, update);
router.post("/:id/add-media", checkAdminAuthToken, addMedia);
router.post("/:id/add-comment", authToken, addNewComment);

module.exports = router;
