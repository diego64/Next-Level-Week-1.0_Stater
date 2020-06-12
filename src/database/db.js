//Dependencia do Sqlite3
const sqlite3 = require("sqlite3").verbose();

//Banco de dados
const db = new sqlite3.Database("./src/database/database.db");

/*db.serialize(() => {

    //Modelo dos dados do Banco
db.run (`
    CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        name TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
);
`);

//Insert de dados na Tabela
const query = `
    INSERT INTO places (
    image,
    name,
    address,
    address2,
    state,
    city,
    items
    ) VALUES (?,?,?,?,?,?,?);
`

const values =[
    "https://images.unsplash.com/photo-1567093321629-c23611f44d52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    "Colectoria",
    "Guilherme Gemballa, Jardim América",
    "Numero 260",
    "Santa Catarina",
    "Resíduos Eletrônicos, Lâmpadas"
]

function afterInsertData(err) {
    if(err) {
        return console.log(err)
}

    console.log("Cadastrado com Sucesso")
    console.log(this)
}

//db.run(query, values, afterInsertData)
}) */

module.exports = db;