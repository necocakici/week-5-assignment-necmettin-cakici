const express = require("express");
const { getAll, insert } = require("../controllers/address");
const { authToken } = require("../middlewares/auth");
const { checkAdminAuthToken } = require("../middlewares/checkAdminAuth");
const router = express.Router();
/*
const { validate } = require("../middlewares/validate");
const { createValidation } = require("../validations/Users");*/

router.get("/", checkAdminAuthToken, getAll);
router.post("/", authToken, insert);

module.exports = router;
