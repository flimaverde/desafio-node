const express = require('express');
const mysql = require('mysql');
const { faker } = require('@faker-js/faker');
const createTableScript = "CREATE TABLE people (name VARCHAR(255))";

const con = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    port: 3306
});


const app = express();

app.get('/', (req, res) => {
    
    if(con.state !== 'connected') {
        connectDb();
        createTable();              
    }

    insertPeople(); 
    queryPeople(res);    
})

app.listen(3000, () => console.log('Server is up and running'));

function endConnection() {
    con.end((err) => {
        if (err) {
            console.log('Error to finish connection...', err)
            return;
        }
        console.log('The connection was finish...')
    })
}


function connectDb() {

    con.connect((err) => {
        if (err) {
            console.log('Erro connecting to database...', err)
            return;
        }
    
        console.log('Connection established!')     
    })
}

function createTable() {
    con.query(createTableScript, (err, result) => {        
        if (err) {
            console.log('Table already exists')
        }    
    })
}

function insertPeople() {
    var sql = "INSERT INTO people (name) VALUES ('" + faker.person.fullName() + "')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
}

function queryPeople(res) {
    con.query('SELECT * FROM people', function (erro, result) {
        if (erro) {
            
        };
        let response = `<h1>Full Cycle Rocks!</h1>`;        
        
        for(let person  of result) {
            response += `${person.name} </br>`
        }    

        res.send(response);
    });  
}