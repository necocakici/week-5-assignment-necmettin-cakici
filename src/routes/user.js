const express = require("express");
const {
  getAll,
  insert,
  login,
  getOne,
  update,
  resetPassword,
  addNewPhone,
  deletePhone,
  updatePhone,
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
  getOne
);
router.post(
  "/",
  validate(createValidation, "body"),
  checkAdminAuthToken,
  insert
);
//! Gelen userla token user aynı mı kontrolü!
router.patch("/:id", checkAdminAuthToken, update);
//? Post
router.patch("/:id/addPhone", checkAdminAuthToken, addNewPhone);
//? Delete
router.patch("/:id/removePhone/:phoneId", checkAdminAuthToken, deletePhone);
//? Patch
router.patch("/:id/updatePhone/:phoneId", checkAdminAuthToken, updatePhone);
router.post(
  "/resetPassword",
  validate(resetPasswordValidation, "body"),
  resetPassword
);

module.exports = router;
