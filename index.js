const { buscaDadosAcervo, salvarImagem} = require('./src/repository/buscaDadosAcervo');
const insertDados = require('./src/repository/exportar');

async function executarRotina() {
    try{
        const dados = 
        await buscaDadosAcervo();
        await salvarImagem(dados);
        await insertDados (dados);
        
    } catch (err){
        console.error('Erro na rotina:',err.message);
    }
    
}

executarRotina();