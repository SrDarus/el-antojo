/** 
 * PUERTO
 */

process.env.PORT = process.env.PORT || 3000

// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// BASE DE DATOS
let urlDB

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/el_antojo'
} else {
    urlDB = process.env.MONGO_URL
}

process.env.URLDB = urlDB

// mongodb+srv://cvargas:<password>@cluster0.ctlbe.mongodb.net/test