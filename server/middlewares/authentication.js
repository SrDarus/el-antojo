const jwt = require('jsonwebtoken')

// Verificar token
let verificaToken = (req, res, next) => {
    let token = req.get('token')
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        // console.log("decoded", decoded)-
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.usuario = decoded.usuario
        next()
    })
}

let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario
    console.log('usuario', usuario)
    if (usuario.roles === 'ADMIN_ROLE') {
        next()
    } else {
        return res.json({
            ok: false,
            err: {
                messge: 'El usuario no es administrador'
            }
        })
    }
}

module.exports = {
    verificaToken,
    verificaAdminRole
}