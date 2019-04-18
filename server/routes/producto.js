const Producto = require('../models/producto');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autentication');
const express = require('express');
const app = express();

// BUSCAR PRODUCTOS DISPONIBLES
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto.find({nombre: regex, disponible: true})
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto
            })
        })
})

// LISTAR TODOS LOS PRODUCTOS DISPONIBLES
app.get('/producto', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    Producto.find()
        .skip(desde)    
        .limit(limite)    
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .sort('nombre')
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto
            })
        })
})

// MOSTRAR UN PRODUCTO POR ID
app.get('/producto/:id', verificaToken, (req, res) =>{
    let id = req.params.id;
    
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {    
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!producto) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID proporcionado no se encontró en la BD'
                    }
                });
            }

            res.json({
                ok: true,
                producto
            })
        })    
})

// AGREGAR UN NUEVO PRODUCTO
app.post('/producto', [verificaToken, verificaAdmin_Role], (req, res) =>{
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        descripcion: body.descripcion,
        precioUni: body.precioUni,
        disponible: body.disponible,        
        usuario: req.usuario._id,
        categoria: body.categoria
    });

    producto.save((err, producto) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        
        res.status(201).json({
            ok: true,
            producto
        })
    });
});

// ACTUALIZAR UN NUEVO PRODUCTO
app.put('/producto/:id', [verificaToken, verificaAdmin_Role], (req, res) =>{
    let id = req.params.id;
    let body = req.body;

    let jsonProducto = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        precioUni: body.precioUni,
        disponible: body.disponible,        
        categoria: body.categoria
    };

    Producto.findByIdAndUpdate(id, jsonProducto, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID del producto no existe'
                }
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        })       
    });
});

// ACTUALIZAR UN NUEVO PRODUCTO
app.delete('/producto/:id', verificaToken, (req, res) =>{
    let id = req.params.id;
    
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID del producto no existe'
                }
            });
        }

        productoDB.disponible = false; 

        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.status(201).json({
                ok: true,
                producto: productoGuardado,
                mensaje: 'El producto ha sido eliminado'
            }) 
        })              
    });
});

module.exports = app;
