//  # código que abre conexão e cria tabela (schema)

//importa a lib better-sqlite3
const Database = require('better-sqlite3')

//abre o arquivo db/database.sqlite
const db = new Database('./db/database.sqlite')

//SQL pra criar a tabela clientes
const createTableSQL = `
CREATE TABLE IF NOT EXISTS clientes (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome TEXT NOT NULL,
cpf TEXT,
telefone TEXT,
carro TEXT,
tempo_locacao TEXT,
created_at TEXT DEFAULT (datetime('now'))
);
`

//executa SQL. Usamos CREATE TABLE IF NOT EXISTS para não quebrar se a tabela já estiver lá.
db.prepare(createTableSQL).run()

//exporta a instancia do db para ser usada em outros arquivos
module.exports = db