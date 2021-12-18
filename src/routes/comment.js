const express = require("express");
const { getAll, insert } = require("../controllers/comment");
const router = express.Router();
/*
const { validate } = require("../middlewares/validate");
const { createValidation } = require("../validations/Users");*/

router.get("/", getAll);
router.post("/", insert);

module.exports = router;
