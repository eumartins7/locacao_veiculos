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
    const {nome, telefone, cpf, carro, tempo_locacao} = req.body

    console.log('Recebi no body:', req.body)
    
    if(!nome || nome.trim()===''){
        return res.status(400).json({error:'O campo nome é obrigatório'})
    }

    try {
        const insert = db.prepare('INSERT INTO clientes (nome, telefone, cpf, carro, tempo_locacao) VALUES (?,?,?,?,?)')
        const info = insert.run(nome, telefone, cpf, carro, tempo_locacao)

        const novo = {
            id: info.lastInsertRowid,
            nome,
            telefone,
            cpf,
            carro,
            tempo_locacao
        }

        res.status(201).json(novo)
    } catch (err) {
        console.error('Erro POST /api/clientes', err)
        res.status(500).json({error:'Erro ao inserir cliente'})
    }
})

// PUT /api/clientes/:id -> atualiza cliente
router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const { nome, telefone, cpf, carro, tempo_locacao } = req.body

    try {
        // Atualiza o cliente
        const stmt = db.prepare(`
            UPDATE clientes 
            SET nome = ?, telefone = ?, cpf = ?, carro = ?, tempo_locacao = ?
            WHERE id = ?
        `)
        const info = stmt.run(nome, telefone, cpf, carro, tempo_locacao, id)

        if (info.changes === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' })
        }

        // Busca o cliente atualizado
        const clienteAtualizado = db.prepare('SELECT * FROM clientes WHERE id = ?').get(id)
        res.json(clienteAtualizado)

    } catch (err) {
        console.error('Erro PUT /api/clientes/:id', err)
        res.status(500).json({ error: 'Erro ao atualizar cliente' })
    }
})

// DELETE /api/clientes/:id -> remove cliente
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    try {
        const stmt = db.prepare('DELETE FROM clientes WHERE id = ?')
        const info = stmt.run(id)

        if (info.changes === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' })
        }

        res.status(204).send() // sem conteúdo
    } catch (err) {
        console.error('Erro DELETE /api/clientes/:id', err)
        res.status(500).json({ error: 'Erro ao remover cliente' })
    }
})

module.exports = router