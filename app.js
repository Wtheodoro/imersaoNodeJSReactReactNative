const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('./models/Metas')
const Meta = mongoose.model('Meta')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control_Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors())
    next()
})

mongoose.connect('mongodb://localhost/teste', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com o DB MongoDB realizado com sucesso!")
}).catch((err) => {
    console.log("ERRO: Não foi possivel estabelecer conexão com o DB: " + err)
})

app.get('/metas', async (req, res) => {
    await Meta.find({}).then((metas) => {
        return res.json({
            error: false,
            metas
        })
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum registro encontrado!"
        })
    })  
})

app.post('/metas', async (req, res) => {
    await Meta.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error:  true,
            message: "Erro: Não foi possivel cadastrar Meta."
        })
    })
    return res.json({
        error: false,
        message: "Meta cadastrada com sucesso!"
    })
})

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000: http://localhost:3000")
})