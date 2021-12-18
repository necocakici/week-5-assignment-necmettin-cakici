const {
  decryptPassword,
  generateToken,
  generatePassword,
} = require("../scripts/utils/helper");
const {
  getAllUsers,
  getSingleUser,
  create,
  edit,
  addPhone,
  resetPw,
  removePhone,
  editPhones,
} = require("../services/user");
const { emailer } = require("../scripts/utils/emailer");

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

const getOne = async (req, res) => {
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
  //! Eğer checkAdminAuthtan gelmiyorsa req.user'ı yoktur
  //! böylelikle signupdan isAdmin true gelmesini önlememiz gerekli
  //* Joi de bool değere default atamayı araştırdım fakat bulamadım.
  let { body } = req;
  if (!req.user || !req.user.isAdmin) {
    body.isAdmin = false;
  }
  try {
    const newUser = await create(body);
    res.status(201).send(newUser);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const update = async (req, res) => {
  const { params, body } = req;
  console.log(`params`, params, body);
  try {
    const updatedUser = await edit(params.id, body);
    res.status(200).send(updatedUser);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const resetPassword = async (req, res) => {
  const { body } = req;
  const newPassword = generatePassword();
  try {
    const newPass = await resetPw(body.email, newPassword);
    if (!newPass) {
      return res.status(400).send("Böyle bir e-maile kayıtlı kullanıcı yok");
    }
    console.log(`newPass`, newPass);
    try {
      await emailer(body.email, newPassword);
    } catch (err) {
      console.log(`err`, err);
      return res.status(500).send(err);
    }

    res.status(200).send(newPass);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const addNewPhone = async (req, res) => {
  const { params, body } = req;
  console.log(`params`, params, body);
  try {
    const updatedPhones = await addPhone(params.id, body);
    res.status(200).send(updatedPhones);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const deletePhone = async (req, res) => {
  const { params, body } = req;
  console.log(`params`, params, body);
  try {
    const updatedPhones = await removePhone(params.id, params.phoneId);
    res.status(200).send(updatedPhones);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

const updatePhone = async (req, res) => {
  const { params, body } = req;
  try {
    const editedPhone = await editPhones(params.id, params.phoneId, body);
    res.status(200).send(editedPhone);
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

module.exports = {
  login,
  getAll,
  getOne,
  insert,
  update,
  resetPassword,
  addNewPhone,
  deletePhone,
  updatePhone,
};
