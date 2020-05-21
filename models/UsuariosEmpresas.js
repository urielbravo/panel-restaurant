const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuariosEmpresasSchema = new Schema({
  usuario: {
    type: { type: Schema.Types.ObjectId, ref: "usuarios" },
    required: true
  },
  empresa: {
    type: Schema.Types.ObjectId,
    ref: "empresas",
    required: true
  },
  rol: {
    type: Schema.Types.ObjectId,
    ref: "roles",
    required: true
  }
});

UsuariosEmpresasSchema.index({ usuario: 1, empresa: 1 }, { unique: true });

mongoose.model("usuariosEmpresas", UsuariosEmpresasSchema);
