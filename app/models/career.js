const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const careerSchema = mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
    minlength: 2,
    maxlength: 10
  },
  nombre: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 150
  },
  description: {
    type: String,
    required: false,
    maxlength: 500
  },
  activo: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Career', careerSchema);
