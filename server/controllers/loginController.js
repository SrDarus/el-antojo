const express = require('express')

const bcrypt = require('bcrypt')

const jwt = require("jsonwebtoken")

const Usuario = require('../models/usuario')

const app = express()

app.post('/login', (req, res) => {

    let body = req.body
        // return res.json({ body })
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: { message: '(Usuario) o password incorrectos' }
            })
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: { message: 'Usuario o (password) incorrectos' }
            })
        }

        let token = jwt.sign({
                    usuario: usuarioDB
                },
                process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
            // 'secreto-desarrollo', { expiresIn: '1h' })
        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        })
    })
})

module.exports = app