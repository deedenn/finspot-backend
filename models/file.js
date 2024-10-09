const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    default: '',
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  type: {
    type: String,
  },
  file: {
    type: Buffer,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('file', fileSchema);