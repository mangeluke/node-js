// app.js
const express = require('express');
const myConnection = require('express-myconnection');
const mysql = require('mysql');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Importar rutas
const customerRoutes = require('./routes/customers');

// Configuración del puerto
const PORT = 3000;

// Configuraciones
app.set('port', process.env.PORT || PORT);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




// Middleware
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'crudnodemysql', // Asegúrate de que el nombre de la base de datos sea correcto
}, 'single'));
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/', customerRoutes);

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en http://localhost:${app.get('port')}`);
});
