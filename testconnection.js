// Teste de conexão com o banco de dados //


const mysql = require ('mysql2/promise');
require('dotenv').config();

async function testconnection() {
    try{
        const connection = await mysql.createConnection({
            //DB Corpore//
            host: process.env.DATABASE_CRP_HOST,
            user: process.env.DATABASE_CRP_USER,
            password: process.env.DATABASE_CRP_PASS,
            database: process.env.DATABASE_CRP_NAME,

            //DB integracao//
            host: process.env.DATABASE_INT_HOST,
            user: process.env.DATABASE_INT_USER,
            password: process.env.DATABASE_INT_PASS,
            database: process.env.DATABASE_INT_NAME,
            
          });
        console.log('Conexão bem-sucedida com os bancos: Corpore e Integracao!');
        await connection.end();

    } catch (err) {
        console.error('Erro ao conectar com o banco de dados', err.message);
    }
    
}

testconnection();