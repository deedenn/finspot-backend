const mongoose = require('mongoose');

const registrySchema = new mongoose.Schema({
  registryID: {
    type: String,
    require: true,
    default: '',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  organization: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Ваша компания',
    required: true,
  },
  requests: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    minlength: 1,
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
  dateOfPay: {
    type: Date,
    default: null,
  },
  statuslog: {
    type: Array,
    // stage: Этап утверждения реестра
    // date: Дата изменения статуса
    // time: Время изменения статуса
    // user: Имя и фамилия пользователя
    // message: Текст комментария
  },
});

module.exports = mongoose.model('registry', registrySchema);
