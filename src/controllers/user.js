const { decryptPassword, generateToken } = require("../scripts/utils/helper");
const { getAllUsers, getSingleUser, create } = require("../services/user");

const login = async (req, res) => {
  const { body } = req;
  try {
    const user = await getSingleUser({ email: body.email });
    if (user) {
      const decryptedPassword = decryptPassword(user.password);
      if (body.password === decryptedPassword) {
        const token = generateToken(user);
        res.status(200).send(token);
      } else {
        res.status(400).send("Şifre hatalı");
      }
    } else {
      res.status(400).send("Böyle bir e-mail'e kayıtlı kullanıcı yok.");
    }
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const getAll = async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).send(allUsers);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const getSingle = async (req, res) => {
  const { params } = req;
  try {
    const user = await getSingleUser({ _id: params.id });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send("Böyle bir kullanıcı yok.");
    }
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const insert = async (req, res) => {
  const { body } = req;
  try {
    const newUser = await create(body);
    res.status(201).send(newUser);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

module.exports = { login, getAll, getSingle, insert };
