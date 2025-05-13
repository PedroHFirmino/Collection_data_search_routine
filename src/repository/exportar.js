
const integracao = require('../config/integracao');


//Busca dados acervo
const buscaDadosAcervo = require('./buscaDadosAcervo');

//Insert dos dados na tabela
async function insertDados() {
  const dados = await buscaDadosAcervo();
    for (const item of dados) {
      try{
      const [result] = await integracao.query('INSERT INTO acervoBiblioteca (codPublic, titulo, codEditora, tombo, nomeEditora, edicao, volume,IDIMAGEM, imagem, autor, qtdeCentro, qtdeCampus, qtdeDisponivel, isReservado) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,)',
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

module.exports = insertDados;

//   // Salvar imagem

//   async function salvarImagem(dadosImagem) {
//   const imagemBinaria = dadosImagem[0]?.imagem;
//   if (imagemBinaria) {
//     const nomeArquivo = 'imagem_salva_teste1.jpg';
//     fs.writeFileSync(nomeArquivo, imagemBinaria);
//     console.log(`Imagem salva como: ${nomeArquivo}`);
//   } else {
//     console.log('Nenhuma imagem disponível.');
//   }
// }