const db = require('../config/integracao');

async function gravarAcervo(dados) {
  for (const item of dados) {
    console.log("Item keys:",Object.keys(item));
    try {
      await db.query('INSERT INTO livros SET ?', [item]);
    } catch (err) {
      console.error(`Erro ao inserir codPublic ${item.codPublic}:`, err.message);
    }
  }
  console.log('Inserção concluída.');
}

module.exports = gravarAcervo;
