const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Usuario');
const Usuario = mongoose.model('usuarios');

// pagina principal de los usuarios, trae la lista completa de usuarios y los muestra
router.get('/', (req, res) => {
  Usuario.find({}).then(usuarios => {
    res.render('usuarios/usuarios_index', {
      usuarios: usuarios
    });
  });
});

// pagina donde esta el form para aregar un usuario
router.get('/add', (req, res) => {
  res.render('usuarios/add_usuario', {
    tiposDeUsuario: Usuario.schema.path('tipo').enumValues
  });
});

// proceso para crear un nuevo usuario
router.post('/', (req, res) => {
  const nuevoUsuario = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
    password: req.body.password,
    tipo: req.body.tipo
  };
  new Usuario(nuevoUsuario).save().then(usuario => {
    res.redirect('/usuarios');
  });
});

// Pagina de editar usuario
router.get('/edit/:id', (req, res) => {
  Usuario.findOne({
    _id: req.params.id
  }).then(usuario => {
    res.render('usuarios/edit_usuario', {
      tiposDeUsuario: Usuario.schema.path('tipo').enumValues,
      usuario: usuario
    });
  });
});

// proceso para editar y actualizar un usuario ya existente
router.put('/:id', (req, res) => {
  Usuario.findOne({
    _id: req.params.id
  }).then(usuario => {
    // nuevos valores
    usuario.nombre = req.body.nombre;
    usuario.apellido = req.body.apellido;
    usuario.correo = req.body.correo;
    usuario.password = req.body.password;
    usuario.tipo = req.body.tipo;

    usuario.save().then(usuario => {
      res.redirect('/usuarios');
    });
  });
});

// Eliminar Usuario
router.delete('/:id', (req, res) => {
  Usuario.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect('/usuarios');
  });
});

module.exports = router;
