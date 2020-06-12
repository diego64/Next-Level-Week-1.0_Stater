const express = require("express")
const server = express()

//Conexão com o BD
const db = require("./database/db")

//Configuração do acesso a pasta Publica
server.use(express.static("public"))

//Habilitação para o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))


//Template Engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Rota Principal (Home)
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título"})
})

//Cadastro 
server.get("/create-point", (req, res) => {
    // req.query: Query Strings da nossa url
    // console.log(req.query)
    return res.render("create-point.html")
})

//Insert de dados
server.post("/savepoint", (req, res) => {
    // Inserindo dos dados do Formulario no BD
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

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)

})

//Busca
server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        //Pesquisa vazia
        return res.render("search-results.html", { total: 0})
    }

    // Buscando as cidades no banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        //Total de itens na busca
        return res.render("search-results.html", { places: rows, total: total})
    })
})

//Start ON no servidor
server.listen(3000)