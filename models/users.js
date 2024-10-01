const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Александра',
  },
  fullname: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Климантович',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (url) => validator.isEmail(url),
      message: 'Неправильный формат email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  active: {
    type: Boolean,
  },
});

module.exports = mongoose.model('user', userSchema);
