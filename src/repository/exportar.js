
const config = require('../config/integracao');
const mysql = require('mysql2/promise')


// Busca dados acervo
const buscaDadosAcervo = require('./buscaDadosAcervo');

// Salvar imagem
const fs = require('fs');
const path = require('path');
 

  async function salvarImagem(dados) {
  // const images = dadosImagem[0]?.imagem;
  const images = path.join(__dirname, 'images');
  if (!fs.existsSync(images)) {
    fs.mkdirSync(images, { recursive: true });
  }
  for (const item of dados){
    if (item.imagem){  
    const nomeArquivo = `imagem_${item.tombo || item.IDIMAGEM}.jpg`;
    const caminho = path.join(images, nomeArquivo);
    fs.writeFileSync(caminho, item.imagem);
    item.imagem = `images/${nomeArquivo}`;
    console.log(`Imagem salva como: ${nomeArquivo}`);
  } else {
    item.imagem = null;
    console.log('Nenhuma imagem disponível.');
  }
}
  }

//Insert dos dados na tabela
async function insertDados() {
  const dados = await buscaDadosAcervo();
    for (const item of dados) {
      try{
      const integracao = await mysql.createConnection(config);
      const [result] = await integracao.query('INSERT INTO acervoBiblioteca (codPublic, titulo, codEditora, tombo, nomeEditora, edicao, volume,IDIMAGEM, imagem, autor, qtdeCentro, qtdeCampus, qtdeDisponivel, isReservado) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [ item.codPublic, 
        item.titulo, 
        item.codEditora, 
        item.tombo, 
        item.nomeEditora, 
        item.edicao, 
        item.volume, 
        item.IDIMAGEM, 
        item.imagem,
        item.autor,
        item.qtdeCentro,
        item.qtdeCampus,  
        item.qtdeDisponivel,
        item.isReservado,
      ]);
      
      console.log(`Itens inseridos com sucesso: ${item}`);

    }catch(err){
      console.error(`Erro ao inserir dado ${item}:`, err.message );
    }
  }
}

module.exports = {
  insertDados,
  salvarImagem};

