const Categoria = require('../models/categoria');
const _ = require('underscore');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autentication');
const express = require('express');
const app = express();

// LISTA TODAS LAS CATEGORIAS DISPONIBLES
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find()
        .populate('usuario', 'nombre email')
        .sort('descripcion')
        .exec((err, categoria) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categoria
            })
        })
})

// MOSTRAR UNA CATEGORIA POR ID
app.get('/categoria/:id',  (req, res) =>{
    let id = req.params.id;
    
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID proporcionado no se encontró en la BD'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })    
})

// CREAR UNA NUEVA CATEGORIA
app.post('/categoria', [verificaToken, verificaAdmin_Role], (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });
})

// ACTUALZIAR UNA CATEGORIA
app.put('/categoria/:id', verificaToken, (req, res) =>{
    let id = req.params.id;
    let body = req.body;
    let jsonCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, jsonCategoria, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

// ELIMINAR UNA CATEGORIA SOLO ADMIN
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) =>{
    let id = req.params.id;
    
    Categoria.findByIdAndDelete(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

module.exports = app;