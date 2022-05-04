const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const studentSchema = new mongoose.Schema({
  nro_identificacion: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
    minlength: 8,
    maxlength: 15
  },
  nombre_1: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  nombre_2: {
    type: String,
    optional: true,
    minlength: 5,
    maxlength: 100
  },
  apellido_1: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  apellido_2: {
    type: String,
    optional: true,
    minlength: 5,
    maxlength: 100
  },
  fecha_de_nacimiento: {
    type: String,
    required: true
  },
  activo: {
    type: Boolean,
    default: true
  },
  carrera: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Student', studentSchema);
