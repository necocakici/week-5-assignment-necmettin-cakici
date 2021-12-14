const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const cryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, "myHashKey").toString();
};

const decryptPassword = (password) => {
  const bytes = CryptoJS.AES.decrypt(password, "myHashKey");
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  return originalPassword;
};

const generateToken = (user) => {
  return jwt.sign({ user }, "tokensecretkey", { expiresIn: "1w" });
};

const generatePassword = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = 12;
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
};

module.exports = {
  cryptPassword,
  decryptPassword,
  generateToken,
  generatePassword,
};
