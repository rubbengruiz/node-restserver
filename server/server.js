require('./config/config');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(require('./routes/index'));

// Habilitar la carpeta Public
app.use(express.static('public'));

mongoose.connect(process.env.URLDB, 
    {useNewUrlParser: true, useCreateIndex: true}, 
    (err, resp) => {
        if (err) throw err;

        console.log('Base de Datos On-line...');
    });
 
app.listen(process.env.PORT, () => {
    console.log('Escuchando peticiones...');
})