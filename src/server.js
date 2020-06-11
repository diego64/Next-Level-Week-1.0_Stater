const express = require("express");
const server = express();

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
    res.render("create-point.html")
});

//Página de procura e resultado de procura
server.get("/search-results", (req, res) => {
    res.render("search-results.html")
});

//Start do Servidor 
server.listen(3000);