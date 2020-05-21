const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

// importar archivo de configuracion de la base de datos
const db = require('./config/database');

// conexion a la base de datos
mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log('Conexion exitosa a la base de datos!'))
  .catch(err => console.log(err));

// importar rutas
const empresas = require('./routes/empresas');
const usuarios = require('./routes/usuarios');
const roles = require('./routes/roles');
const permisos = require('./routes/permisos');

// middleware del body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// middleware de method override
app.use(methodOverride('_method'));

// usar rutas
app.use('/empresas', empresas);
app.use('/usuarios', usuarios);
app.use('/roles', roles);
app.use('/permisos', permisos);

//  middleware de handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// fijar directorio 'public', aqui es donde van todos los static
app.use(express.static(path.join(__dirname, 'public')));

// Login
app.get('/', (req, res) => {
  res.render('login', { layout: false }); //puedes usar {layout:false} coomo segundo argumento para que no se cargue el main layout
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Servidor arrancó en el puerto: ${port}`);
});
