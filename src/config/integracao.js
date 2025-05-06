const mysql = require('mysql2/promise')
require ('dotenv').config();

const integracao = mysql.createPool ({
    host: process.env.DATABASE_INT_HOST,
    user: process.env.DATABASE_INT_USER,
    password: process.env.DATABASE_INT_PASS,
    database: process.env.DATABASE_INT_NAME,


});

module.exports=integracao;