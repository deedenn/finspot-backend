const mongoose = require('mongoose');

const registrySchema = new mongoose.Schema({
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
  },
  requests: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'request',
    required: true,
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
});

module.exports = mongoose.model('registry', registrySchema);
