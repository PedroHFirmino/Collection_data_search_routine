const sequelize = require ('../../src/config/Sequelize');
const { QueryTypes } = require ('sequelize');

const getlivrosBiblioteca = async (id) =>{
    let mysql;
    let replacements = {};

    if(id){
        mysql = `select * from acervobiblioteca where id = :id `;
        replacements = {id};

    }else{
        mysql = `select * from acervobiblioteca`;
    }

    let livros = await sequelize.query(mysql, {
        type: QueryTypes.SELECT,
        replacements

        }
    );
    return livros;
};

module.exports = { getlivrosBiblioteca };