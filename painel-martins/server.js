// # arquivo principal do servidor (Express)

const express = require('express')
const app = express()
const path = require('path');

//middleware para interpretar JSON do body
app.use(express.json())

//servir arquivos estaticos de painel-martins/
app.use(express.static(path.join(__dirname, 'painel.front')));

//mobta as rotas de clientes
const clientesRouter = require('./src/routes/clientes')
app.use('/api/clientes', clientesRouter)

//porta
app.listen(5501, () => {
    console.log('Servidor rodando em http://localhost:5501')
})