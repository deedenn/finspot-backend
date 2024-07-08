const mongoose = require('mongoose');
const validator = require('validator');

const requestSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  desctription: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  company: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Ваша компания',
  },
  contragent: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Контрагент',
  },
  amount: {
    type: Number,
    minlength: 2,
    maxlength: 10,
    default: '0',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', requestSchema);
