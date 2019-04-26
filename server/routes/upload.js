const Usuario = require('../models/users');
const Producto = require('../models/producto');
const fs = require('fs');
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.put('/upload/:tipo/:id', function(req, res) {
    let tipo = req.params.tipo; 
    let id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo'
            }
        });
    }

    let tiposValidos = ['productos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son ' + tiposValidos.join(', ')
            }
        });   
    }

    let archivo = req.files.adjunto;    
    let nombreSplit = archivo.name.split('.');
    let extension = nombreSplit[nombreSplit.length - 1];       
    // Extensiones permitidas
    let extValidas = ['png', 'jpg', 'gif'];

    if (extValidas.indexOf(extension) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + extValidas.join(', ')
            }
        });   
    }

    // Cambiar nombre del archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
            
        if ( tipo == 'usuarios')
            uploadImageUsers(id, res, nombreArchivo);    
        else 
        if ( tipo == 'productos')
            uploadImageProducts(id, res, nombreArchivo); 
    });
});

function uploadImageUsers(id, res, nombreArchivo){
    let nuevaImagen = {
        img: nombreArchivo
    }
    
    Usuario.findOneAndUpdate({'_id': id}, nuevaImagen, (err, usuarioDB) => {
        deleteFile(nombreArchivo, tipo);

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            deleteFile(nombreArchivo, tipo);

            return res.status(400).json({
                ok: false,
                err: {
                    message: `El ${tipo} no existe en la BD`
                }
            });
        }

        deleteFile(usuarioDB.img, tipo);

        res.json({
            ok: true,
            respuesta: usuarioDB,
            img: nombreArchivo
        })
    });
}

function uploadImageProducts(id, res, nombreArchivo){
    let nuevaImagen = {
        img: nombreArchivo
    }
    
    Producto.findOneAndUpdate({'_id': id}, nuevaImagen, (err, productoDB) => {
        deleteFile(nombreArchivo, tipo);

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            deleteFile(nombreArchivo, tipo);

            return res.status(400).json({
                ok: false,
                err: {
                    message: `El ${tipo} no existe en la BD`
                }
            });
        }

        deleteFile(productoDB.img, tipo);

        res.json({
            ok: true,
            respuesta: productoDB,
            img: nombreArchivo
        })
    });
}

function deleteFile(nombreImagen, tipo){
    let pathImagen = path.join(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
        
    if(fs.existsSync(pathImagen)){
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;