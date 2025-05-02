const mysql = require('mysql/promise')
require ('dotenv').config();

const pool = mysql.createPool ({
    host: process.env.DATABASE_CRP_HOST,
    user: process.env.DATABASE_CRP_USER,
    password: process.env.DATABASE_CRP_PASS,
    database: process.env.DATABASE_CRP_NAME,
    waitForConnections: true,
    connectionLimit: 10,

});





module.exports=Corpore;