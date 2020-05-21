const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TIPOS = ['admin', 'vendedor', 'cliente'];

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: TIPOS,
    required: true
  }
});

mongoose.model('usuarios', UsuarioSchema);
