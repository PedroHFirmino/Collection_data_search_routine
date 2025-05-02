const mysql = require('mysql/promise')
require ('dotenv').config();

const pool = mysql.createPool ({
    host: process.env.DATABASE_INT_HOST,
    user: process.env.DATABASE_INT_USER,
    password: process.env.DATABASE_INT_PASS,
    database: process.env.DATABASE_INT_NAME,
    waitForConnections: true,
    connectionLimit: 10,

});

module.exports=integração;