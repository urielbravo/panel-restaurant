const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolSchema = new Schema({
  nombre: {
    type: 'String',
    required: true
  },
  permisos: {
    type: [Number]
  }
});

mongoose.model('roles', RolSchema);
