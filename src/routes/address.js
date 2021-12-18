const express = require("express");
const {
  getAll,
  insert,
  remove,
  getOne,
  update,
} = require("../controllers/address");
const { authToken } = require("../middlewares/auth");
const { checkAdminAuthToken } = require("../middlewares/checkAdminAuth");
const router = express.Router();

router.get("/", checkAdminAuthToken, getAll);
router.get("/:id", authToken, getOne);
router.patch("/:id", authToken, update);
router.post("/", authToken, insert);
router.delete("/:id", authToken, remove);

module.exports = router;
