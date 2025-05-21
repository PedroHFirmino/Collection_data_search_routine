const {Sequelize} = require ('sequelize');
require('dotenv').config();

const sequelize = new Sequelize( 
    process.env.DATABASE_INT_NAME,
    process.env.DATABASE_INT_USER,
    process.env.DATABASE_INT_PASS,
    {
        host: process.env.DATABASE_INT_HOST,
        dialect: 'mysql',
    }
);

module.exports = sequelize;