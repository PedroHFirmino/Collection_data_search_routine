const connection = require('../config/database');
const fs = require('fs');

const rawData = fs.readFileSync('../../data.json');
const livro = JSON.parse(rawData);

const query = `
  INSERT INTO livros SET ?
`;

connection.query(query, livro, (err, results) => {
  if (err) {
    console.error('Erro ao inserir:', err);
  } else {
    console.log('Livro inserido com sucesso!');
  }
  connection.end();
});