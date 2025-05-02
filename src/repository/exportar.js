const { buscaDadosAcervo} = require('../repository/acervo');
const Corpore = requestIdleCallback('./config/databaseRM')

async function exportar() {
    const dados = await buscaDadosAcervo ();

    const conn = await Corpore.getconnection();
    try{
        for (const item of dados) {
            await conn.query(`
        REPLACE INTO AcervoIntegrado (
          codPublic, titulo, codEditora, tombo,
          nomeEditora, edicao, volume, IDIMAGEM,
          imagem, autor, qtdeCentro, qtdeCampus,
          qtdeDisponivel, isReservado
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        item.codPublic,
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
        }
    console.log(`Exportação concluída com $ {dados.lenght} registros.`);
        } catch (err){
    console.error(`Erro ao exportar`,err);
        }finally{
            conn.release();
        }
}

module.exports = {exportar};