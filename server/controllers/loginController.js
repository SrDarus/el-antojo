const express = require('express')

const bcrypt = require('bcrypt')

const jwt = require("jsonwebtoken")

const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.CLIENT_ID)

const Usuario = require('../models/usuario')

const app = express()

app.post('/login', (req, res) => {
    console.log("req", req)
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

async function verify(token) {
    console.log("----->", token)
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    console.log("payload", payload)
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}
//  verify().catch(console.error)

app.post('/google', async(req, res) => {
    console.log("*******************", req.body)
    console.log("*********111**********", req.body.id_token)
    let token = req.body.id_token;
    let googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                err: e
            })
        })
    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (usuarioDB) {
            if (usuarioDB.google === false) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Debe de usar su autenticación normal'
                    }
                })
            } else {
                let token = jwt.sign({
                        usuario: usuarioDB
                    },
                    process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            }
        } else {
            // NO EXISTE USUARIO
            let usuario = new Usuario()

            usuario.nombre = googleUser.nombre
            usuario.direccion = ''
            usuario.rut = ''
            usuario.email = ''
            usuario.img = googleUser.img
            usuario.google = true
            usuario.password = 'Caradej1';

            usuario.save((err, usuarioDB) => {
                if (err) {
                    console.log("-------->", err)
                }
                let token = jwt.sign({
                        usuario: usuarioDB
                    },
                    process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            })
        }
    })
});

module.exports = app