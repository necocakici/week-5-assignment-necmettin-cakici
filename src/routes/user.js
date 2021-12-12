const express = require("express");
const { getAll, insert, login, getSingle } = require("../controllers/user");
const { authToken } = require("../middlewares/auth");
const { checkAdminAuthToken } = require("../middlewares/checkAdminAuth");
const router = express.Router();
/*
const { validate } = require("../middlewares/validate");
const { createValidation } = require("../validations/Users");*/

router.post("/signup", insert);
router.post("/login", login);

router.get("/", checkAdminAuthToken, getAll);
router.get("/:id", checkAdminAuthToken, getSingle);
router.post("/", checkAdminAuthToken, insert);

module.exports = router;
