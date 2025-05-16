const sqlite3 = require('sqlite3').verbose();
const db =  new sqlite3.Database('./src/database/database.db');

module.exports = db;

// db.serialize(() => {
    // Criar tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);

//     // Inserir dados
//     const query = `
//         INSERT INTO places (
//             name,
//             image,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values = [
//         "Papersider",
//         "https://images.unsplash.com/photo-1558047454-117667853aea?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "Guilherme Gemballa, Jardim América",
//         "260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

//     db.run(query, values, function(err) {
//         if(err) {
//             return console.log(err);
//         }

//         console.log('Cadastrado com sucesso');
//         console.log(this);
//     })

//     // Deletar dados
//     // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
//     //     if(err) {
//     //         return console.log(err)
//     //     }

//     //     console.log("Registro deletado com sucesso!")
//     // });

//         // Consultar dados
//     db.all(`SELECT * FROM places`, function(err, rows) {
//         console.log("Aqui estão seus registros:");
//         console.log(rows);
//     })
// })