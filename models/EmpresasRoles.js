const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmpresasRolesSchema = new Schema({
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

EmpresasRolesSchema.index({ empresa: 1, rol: 1 }, { unique: true });

mongoose.model("empresasRoles", EmpresasRolesSchema);
