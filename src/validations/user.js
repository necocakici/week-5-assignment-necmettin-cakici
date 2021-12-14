const Joi = require("joi");

const createValidation = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(8).required(),
  address: Joi.array().items(Joi.string()),
  phones: Joi.array().items(
    Joi.object({
      number: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
      type: Joi.string(),
    })
  ),
  favorites: Joi.array().items(Joi.string()),
  isAdmin: Joi.boolean(),
});

const getUserValidation = Joi.object({
  id: Joi.string().length(24),
});
const resetPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
});
module.exports = {
  createValidation,
  getUserValidation,
  resetPasswordValidation,
};
