const express = require("express");
const server = express();

//Banco de daddos
const db = require("./database/db");

//Configuração das Pastas Publicas
server.use(express.static("public"));

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

//Paginia Inicial
server.get("/", (req, res) => {
    res.render("index.html", { title: "Seu marketplace de coletas de resíduos"})
});

//Pagina de cadastro
server.get("/create-point", (req, res) => {
    console.log(req.query)


   return res.render("create-point.html")
});

//Página de procura e resultado de procura
server.get("/search", (req, res) => {
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length;

        res.render("search-results.html", {places: rows, total: total})
    });
});

//Start do Servidor 
server.listen(3000);