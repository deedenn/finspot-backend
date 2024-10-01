const { Joi } = require('celebrate');
const { regExp } = require('./constants');

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const registrationValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    fullname: Joi.string().min(2).max(30),
  }),
};

const organizationValidation = {
  body: Joi.object().keys({
    inn: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(40),
    prefix: Joi.string().min(2).max(4),
  })
}

module.exports = {
  loginValidation,
  registrationValidation,
  organizationValidation,
};
