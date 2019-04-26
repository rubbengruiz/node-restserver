const fs = require('fs');
const path = require('path');
const { verificaTokenImg } = require('../middlewares/autentication');
const express = require('express');
let  app = express();

app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {
    let tipo = req.params.tipo;
    let imagen = req.params.img;
    let pathImagen =  path.join(__dirname, `../../uploads/${tipo}/${imagen}`);
    
    if(fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    }
    else {
        let pathNoImagen = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(pathNoImagen);
    }    
})

module.exports = app;

