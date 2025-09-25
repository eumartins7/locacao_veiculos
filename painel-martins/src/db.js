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
telefone TEXT,
cpf TEXT,
carro TEXT
);
`

//exec executa SQL sem preparar parametros
db.exec(createTableSQL)

//exporta a instancia do db para ser usada em outros arquivos
module.exports = db