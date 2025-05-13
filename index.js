const { buscaDadosAcervo, salvarImagem} = require('./src/repository/buscaDadosAcervo');
const gravarAcervo = require('./src/repository/exportar');

async function executarRotina() {
    try{
        const dados = 
        await buscaDadosAcervo();
        await salvarImagem(dados);
        await gravarAcervo (dados);

    } catch (err){
        console.error('Erro na rotina:',err.message);
    }
    
}

executarRotina();