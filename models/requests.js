const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requestId: {
    type: Number,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  organization: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Ваша компания',
  },
  type: {
    type: String,
  },
  file: {
    type: String,
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
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  statuslog: {
    type: Array,
  },
});

module.exports = mongoose.model('request', requestSchema);
