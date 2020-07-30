require('./config/config')
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')


const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('./controllers/index'))
app.use(bodyParser.json())

// HABILITAR CARPETA PUBLIC
app.use(express.static(path.resolve(__dirname, '../public')))
console.log(path.resolve(__dirname, '../public'))
    // Configuración global de rutas
mongoose.connect(
    // 'mongodb://localhost:27017/el_antojo', {
    process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, (err, res) => {

        if (err) throw err
            // console.log("conectado", res)
    });



app.listen(process.env.PORT, () => {
    console.log(`listen en ${process.env.PORT}`)
})