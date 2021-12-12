const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const decryptPassword = (password) => {
  const bytes = CryptoJS.AES.decrypt(password, "myHashKey");
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  return originalPassword;
};

const generateToken = (user) => {
  return jwt.sign({ user }, "tokensecretkey", { expiresIn: "1w" });
};

module.exports = {
  decryptPassword,
  generateToken,
};
