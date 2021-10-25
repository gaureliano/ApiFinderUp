const mysql = require('mysql');

// Configuração do banco de dados
var pool = mysql.createPool({
    "user": "root",
    "password": "admin123",
    "database": "finderup",
    "host": "localhost",
    "port" : 3306
});

exports.pool = pool;