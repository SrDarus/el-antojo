const express = require('express')
app = express()


app.use(require("./usuarioController"))
app.use(require("./loginController"))

module.exports = app