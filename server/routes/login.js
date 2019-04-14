const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    
    User.findOne({email: body.email}, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        
        if (!usuarioDB)
        {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o password incorrectos'
                }
            });    
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password))
        {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (password) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.EXPIRE_TOKEN });

        res.json({
            ok: true,
            user: usuarioDB,
            token
        })
    });
})

module.exports = app;