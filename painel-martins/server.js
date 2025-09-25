// # arquivo principal do servidor (Express)

const express = require('express')
const app = express()

//middleware para interpretar JSON do body
app.use(express.json())

//servir arquivos estaticos de painel-martins/
app.use(express.static('painel-martins'))

//mobta as rotas de clientes
const clientesRouter = require('./src/routes/clientes')
app.use('/api/clientes', clientesRouter)

//porta
const PORT = 3000
app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`)
})