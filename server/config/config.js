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
    urlDB = `mongodb+srv://cvargas:Caradej1@cluster0.ctlbe.mongodb.net/el_antojo`
}

process.env.URLDB = urlDB

// mongodb+srv://cvargas:<password>@cluster0.ctlbe.mongodb.net/test