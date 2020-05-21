if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI: 'mongodb://CHANGEME'}
  } else {
    // se crea una base de datos local con nombre 'panel-admin', se genera hasta que agregues algo a la BD
    module.exports = {mongoURI: 'mongodb://localhost/panel-admin'} 
  }