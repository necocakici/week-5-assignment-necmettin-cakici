const Joi = require("joi");

const validate = (schema, source) => (req, res, next) => {
  const { value, error } = schema.validate(req[source]);
  if (error) {
    const errorMessage = error.details
      ?.map((detail) => detail.message)
      .join(",");
    res.status(400).json({
      error: errorMessage,
    });
    return;
  }
  Object.assign(req, value);
  next();
};

module.exports = { validate };
