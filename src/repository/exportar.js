const integracao = require('../config/integracao');

async function gravarAcervo(dados) {
  for (const item of dados) {
    try {
      const {imagem, ...dadosSemImagem} = item;
      await integracao.query('INSERT INTO acervo-biblioteca SET ?', [dadosSemImagem]);
    } catch (err) {
      console.error(`Erro ao inserir codPublic ${item.codPublic}:`, err.message);
    }
  }

  console.log('Inserção concluída.');
}

module.exports = gravarAcervo;
