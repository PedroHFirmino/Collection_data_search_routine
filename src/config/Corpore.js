const mysql = require('mysql2/promise')
require ('dotenv').config();

module.exports ={
    host: process.env.DATABASE_CRP_HOST,
    user: process.env.DATABASE_CRP_USER,
    password: process.env.DATABASE_CRP_PASS,
    database: process.env.DATABASE_CRP_NAME,

};