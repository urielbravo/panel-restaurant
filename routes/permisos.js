const express = require("express");
const router = express.Router();

// pagina principal de los usuarios, trae la lista completa de usuarios y los muestra
router.get("/", (req, res) => {
  res.render("permisos/permisos_index");
});

module.exports = router;
