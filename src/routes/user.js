const express = require("express");
const {
  getAll,
  insert,
  login,
  getSingle,
  update,
  resetPassword,
} = require("../controllers/user");
const { checkAdminAuthToken } = require("../middlewares/checkAdminAuth");
const { validate } = require("../middlewares/validate");
const {
  createValidation,
  getUserValidation,
  resetPasswordValidation,
} = require("../validations/user");
const router = express.Router();

router.post("/signup", validate(createValidation, "body"), insert);
router.post("/login", login);

router.get("/", checkAdminAuthToken, getAll);
router.get(
  "/:id",
  validate(getUserValidation, "params"),
  checkAdminAuthToken,
  getSingle
);
router.post(
  "/",
  validate(createValidation, "body"),
  checkAdminAuthToken,
  insert
);
router.patch("/:id", checkAdminAuthToken, update);
router.post(
  "/resetPassword",
  validate(resetPasswordValidation, "body"),
  resetPassword
);

module.exports = router;
