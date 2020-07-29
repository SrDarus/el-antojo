// PUERTO
process.env.PORT = process.env.PORT || 3000

// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// VENCIMIENTO DEL TOKEN
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

// SEED de autenticacion
process.env.SEED = process.env.SEED || 'secreto-desarrollo'

// BASE DE DATOS
let urlDB
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/el_antojo'
} else {
    urlDB = process.env.MONGO_URL
}
process.env.URLDB = urlDB