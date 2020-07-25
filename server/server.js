require('./config/config')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.json('hello world')
})


app.get('/usuario', function(req, res) {
    res.json('hello world')
})

app.get('/usuarios', function(req, res) {
    res.json('hello world')
})

app.post('/usuario', function(req, res) {

    let body = req.body
    res.json({
        usuario: body
    })
})

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id

    res.json({
        id
    })
})

app.delete('/usuario', function(req, res) {
    res.json('hello world')
})



app.listen(process.env.PORT, () => {
    console.log(`listen en ${process.env.PORT}`)
})