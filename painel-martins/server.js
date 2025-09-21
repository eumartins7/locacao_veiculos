// # arquivo principal do servidor (Express)

const express = require('express')

const app = express()

app.use(express.static('painel-martins'))

app.listen(3000, () => {
    console.log('servidor rodando em http://localhost:3000')
})