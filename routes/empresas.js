const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// importar el modelo 'Empresa'
require('../models/Empresa');
const Empresa = mongoose.model('empresas');

// importar el modelo 'Usuario'
require('../models/Usuario');
const Usuario = mongoose.model('usuarios');

// pagina principal de las empresas, trae la lista completa de empresas y las muestra
router.get('/', (req, res) => {
  Empresa.find({})
    .populate('usuario')
    .then(empresas => {
      res.render('empresas/empresas_index', {
        empresas: empresas
      });
    });
});

// ruta que lleva a la pagina para agregar empresa
router.get('/add', (req, res) => {
  Usuario.find({}).then(usuarios => {
    res.render('empresas/add_empresa', {
      usuarios: usuarios
    });
  });
});

// proceso para agregar nueva empresa
router.post('/', (req, res) => {
  const nuevaEmpresa = {
    nombre: req.body.nombre,
    usuario: req.body.usuario
  };

  new Empresa(nuevaEmpresa).save().then(empresa => {
    res.redirect('/empresas');
  });
});

// ruta que lleva a la pagina para editar una empresa
router.get('/edit/:id', (req, res) => {
  Promise.all([
    Empresa.findOne({ _id: req.params.id }).populate('usuario'),
    Usuario.find()
  ]).then(([empresa, usuarios]) => {
    res.render('empresas/edit_empresa', {
      empresa: empresa,
      usuarios: usuarios
    });
  });
});

// proceso para editar y actualizar una empresa ya existente
router.put('/:id', (req, res) => {
  Empresa.findOne({ _id: req.params.id }).then(empresa => {
    empresa.nombre = req.body.nombre;
    empresa.usuario = req.body.usuario;

    empresa.save().then(empresa => {
      res.redirect('/empresas');
    });
  });
});

// Eliminar empresa
router.delete('/:id', (req, res) => {
  Empresa.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect('/empresas');
  });
});

module.exports = router;
