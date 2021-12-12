const express = require("express");
const { getAll, insert } = require("../controllers/product");
const { checkAdminAuthToken } = require("../middlewares/checkAdminAuth");
const router = express.Router();
/*
const { validate } = require("../middlewares/validate");
const { createValidation } = require("../validations/Users");*/

router.get("/", getAll);
router.post("/", checkAdminAuthToken, insert);

module.exports = router;
