const jwt = require('jsonwebtoken');

// Verificar TOKEN
let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token de autorización inválido'
                }
            });
        }

        req.usuario = decode.usuario;
        next();
    })
};

// Verificar ADMIN_ROLE
let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role !== 'ADMIN_ROLE') 
    {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Debe tener role de administrador para ejecutar esta tarea'
            }
        });
    } 

    next();
};

// Verificar TOKEN Imagen
let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token de autorización inválido'
                }
            });
        }

        req.usuario = decode.usuario;
        next();
    })
};

module.exports = { 
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
};