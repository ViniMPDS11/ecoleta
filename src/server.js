const express = require("express");
const path = require("path");
const server = express();
const nunjucks = require('nunjucks');

// Pegar o banco de dados
const db = require("./database/db.js");

server.use(express.static(path.join(__dirname, "../public")));

// habilitar o req.body na aplicação
server.use(express.urlencoded({ extended: true }));

nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render('index.html');
});

server.get('/create-point', (req, res) => {
    return res.render('create-point.html');
});

server.post("/savepoint", (req, res) => {
    // Inserir dados
    const query = `
        INSERT INTO places (
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    db.run(query, values, function(err) {
        if(err) {
            return res.send("Erro no cadastro!")
        }

        console.log('Cadastrado com sucesso');
        console.log(this);

        return res.render('create-point.html', {saved: true});
    })
})

server.get('/search-results', (req, res) => {
    const search = req.query.search;

    if(search == "") {
        return res.render('search-results.html', { total: 0 });
    }

    // Pegar os dados do banco de dados
    db.all(`
        SELECT * FROM places WHERE city LIKE '%${search}%'
    `, function(err, rows) {
        if(err) {
            return console.log(err);
        }
        
        const total = rows.length;

        // mostrar a página html com so dados dao db
        return res.render('search-results.html', { places: rows, total });
    });
});

server.listen(3000);