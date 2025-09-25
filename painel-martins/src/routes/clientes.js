// # rotas /api/clientes

const express = require('express')
const router = express.Router()

//pega a instancia do DB que criei em src/db.js
const db = require('../db') //caminho relativo do arquivo

//GET /api/clientes -> lista todos os clientes
router.get('/', (req,res) => {
    try{
        //prepara e executa o SELECT, .all() retorna todos os resultados como array
        const stmt = db.prepare('SELECT * FROM clientes ORDER BY id DESC')
        const clientes = stmt.all()
        res.json(clientes) //responde com JSON
    } catch (err) {
        console.error('erro GET /api/clientes', err)
        res.status(500).json({error:'Erro no servidor'})
    }
})

//POST /api/clientes -> cria um novo cliente
router.post('/', (req,res) => {
    const {nome, telefone, cpf, carro} = req.body
    
    //validacao minima - sempre validar no backend
    if(!nome || nome.trim()===''){
        return res.status(400).json({error:'O campo nome é obrigatório'})
    }

    try {
        //usamos placeholders (?) para evitar injeção - passamos os valores depois
        const insert = db.prepare('INSERT INTO clientes (nome, telefone, cpf, carro) VALUES (?,?,?,?)')
        const info = stmt.get(info.lastInsertRowid)

        //retornamos 201 Created com o objeto inserido
        res.status(201).json(novo)
    } catch (err) {
        console.err('Erro POST /api/clientes', err)
        res.status(500).json({error:'Erro ao inserir clientes'})
    }
})

module.exports = router