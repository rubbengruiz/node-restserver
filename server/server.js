require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(require('./routes/users'));

mongoose.connect(process.env.URLDB, 
    {useNewUrlParser: true, useCreateIndex: true}, 
    (err, resp) => {
        if (err) throw err;

        console.log('Base de Datos On-line...');
    });
 
app.listen(process.env.PORT, () => {
    console.log('Escuchando peticiones...');
})