const express = require('express');

const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');

const {
    verificaToken,
    verificaAdminRole
} = require('../middlewares/authentication')

const app = express()

const _ = require('underscore');

/*app.get('/usuario', verificaToken, (req, res) => {
    console.log("usuario", req.usuario)
    return res.json({
        usuario: req.usuario
    })
})*/

app.get('/usuarios', [verificaToken, verificaAdminRole], (req, res) => {

    let desde = req.query.desde || 0
    desde = Number(desde)
    let limite = req.query.limite || 5
    limite = Number(limite)

    Usuario.find({ estado: true }, 'email direccion nombre apellido rut img roles google')
        // Usuario.find({ google: true }, )
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }

            //Usuario.count({ google: true }, (err, conteo) => {
            Usuario.countDocuments({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    stockAll: conteo
                })
            })
        })
})

app.post('/usuario', [verificaToken, verificaAdminRole], (req, res) => {
    // console.log("req", req)
    // console.log("res", res)
    let body = req.body

    let usuario = new Usuario({
        email: body.email,
        direccion: body.direccion,
        password: bcrypt.hashSync(body.password, 10),
        nombre: body.nombre,
        apellido: body.apellido,
        rut: body.rut,
        img: body.img,
        crate_at: new Date(),
        // roles: body.roles,
        pedidos: body.pedidos,
        google: body.google
    })
    usuario.save((err, usuarioDb) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }
        usuarioDb.password = null
        delete usuarioDb
        res.json({
            ok: true,
            result: usuarioDb
        })

    })
})

app.put('/usuario/:id', verificaToken, (req, res) => {

    let id = req.params.id
    let campos = [
        'email',
        'direccion',
        'nombre',
        'apellido',
        'rut',
        'img'
    ]
    let body = _.pick(req.body, campos)



    let options = {
        new: true,
        runValidators: true,
        context: 'query'
    }
    Usuario.findByIdAndUpdate(id, body, options, (err, usuarioDb) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            result: usuarioDb
        })
    })
})

app.delete('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id
        // let campos = [
        //     'estado',
        // ]

    // let body = _.pick(req.body, campos)



    let options = {
        new: true,
        runValidators: true,
        context: 'query'
    }
    Usuario.findByIdAndUpdate(id, { estado: false }, options, (err, usuarioDb) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }
        console.log("usuario", usuarioDb)
        if (!usuarioDb) {
            res.status(400).json({
                ok: false,
                result: usuarioDb
            })
        }

        res.json({
            ok: true,
            result: usuarioDb
        })
    })
})

module.exports = app