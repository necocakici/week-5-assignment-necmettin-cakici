const express = require("express");
const {
  getAll,
  getOne,
  update,
  insert,
  remove,
} = require("../controllers/category");
const router = express.Router();
/*
const { validate } = require("../middlewares/validate");
const { createValidation } = require("../validations/Users");*/

router.get("/", getAll);
router.get("/:id", getOne);
router.patch("/:id", update);
router.post("/", insert);
router.delete("/:id", remove);

module.exports = router;
