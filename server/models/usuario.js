const monsoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = monsoose.Schema

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    MESSAGE: '{VALUE} no es un role valido'
}

let usuarioSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    direccion: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Debe ingresar un password']
    },
    nombre: {
        type: String,
        required: [true, 'Debe ingresar un nombre']
    },
    apellido: {
        type: String,
    },
    rut: {
        type: String,
        unique: true
    },
    img: {
        type: String,
        default: 'USER_ROLE'
    },
    crate_at: {
        type: Date
    },
    estado: {
        type: Boolean,
        default: true
    },
    roles: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    pedidos: {
        type: []
    },
    google: {
        type: Boolean,
        default: false
    }
})

usuarioSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = monsoose.model('Usuario', usuarioSchema)